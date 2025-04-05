"""
    Module for scraping Amazon reviews.
"""

import logging
import time

from typing import List
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from webdriver_manager.chrome import ChromeDriverManager

from amazon_review_scraper.conf import amazon_review_scraper_settings
from amazon_review_scraper.models import Review,  ProductDetails


logging.getLogger("WDM").setLevel(logging.ERROR)


class DriverInitializationError(BaseException):
    message = "Unable to initialize Chrome webdriver for scraping."


class DriverGetReviewsError(BaseException):
    message = "Unable to get Amazon review data with Chrome webdriver."


class AmazonReviewScraper:
    """Class for scraping Amazon reviews"""

    def __init__(self, logger: logging.Logger | None = None) -> None:
        self._logger = logger if logger else logging.getLogger(__name__)

    def _init_chrome_driver(self) -> webdriver.Chrome:
        """Initializes Chrome webdriver"""
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        return driver

    def _parse_review_data(self, review: WebElement) -> Review:
        """Parses review data from the given review element"""
        try:
            author = review.find_element(By.CLASS_NAME, "a-profile-name").text
        except Exception:
            author = "Unknown Author"

        try:
            content = review.find_element(By.CLASS_NAME, "reviewText").text
        except Exception:
            content = "No content available"

        try:
            rating_element = review.find_element(
                By.CLASS_NAME, "review-rating"
            ).find_element(By.CLASS_NAME, "a-icon-alt")
            rating_text = rating_element.get_attribute("innerHTML")
            rating = float(rating_text.split(" out of ")[0])
        except Exception:
            rating = 0.0

        try:
            title_element = review.find_element(
                By.CLASS_NAME, "review-title-content"
            ).find_element(By.TAG_NAME, "span")
            title = title_element.text
        except Exception:
            title = "No title available"

        return Review(
            author=author,
            content=content,
            rating=rating,
            title=title,
        )


    def _get_reviews_from_product_page(
        self, url: str, driver: webdriver.Chrome
    ) -> List[Review]:
        """Scrapes the Amazon product page for reviews"""
        driver.get(url)
        time.sleep(3)
        review_elements = driver.find_elements(By.CLASS_NAME, "review")
        parsed_reviews = []
        for review in review_elements:
            try:
                parsed_review = self._parse_review_data(review)
            except Exception:
                self._logger.exception(
                    "Uexpected error when parsing data for product. Skipping.."
                )
                continue
            else:
                parsed_reviews.append(parsed_review)

        return parsed_reviews

    def scrape_amazon_reviews(self, asin_code: str) -> List[Review]:
        """
        Retrieves a list of reviews from Amazon for a given Amazon product ASIN code.

        Returns:
            List[Review]: A list of Review objects.
        Raises:
            DriverInitializationError: If the Chrome webdriver cannot be initialized.
            DriverGetReviewsError: If the Amazon product review data cannot be scraped from the Amazon site.
        """
        self._logger.info(f"Scraping Amazon Reviews for product {asin_code}..")

        try:
            driver = self._init_chrome_driver()
        except Exception as e:
            raise DriverInitializationError from e

        url = amazon_review_scraper_settings.get_amazon_product_url(asin_code)
        try:
            return self._get_reviews_from_product_page(url, driver)
        except Exception as e:
            raise DriverGetReviewsError from e
        finally:
            driver.close()
    def _get_product_details(self, url: str, driver: webdriver.Chrome) -> dict:
        """
        Extracts product details such as title, description, and price from the Amazon product page.

        Args:
            url (str): The URL of the Amazon product page.
            driver (webdriver.Chrome): The initialized Chrome WebDriver.

        Returns:
            dict: A dictionary containing the product title, description, and price.
        """
        self._logger.info("Navigating to product page...")
        driver.get(url)
        time.sleep(3)  # Allow the page to load

        try:
            # Parse the page source with BeautifulSoup
            soup = BeautifulSoup(driver.page_source, 'html.parser')

            # Extract product title
            title_element = soup.select_one("#productTitle")
            title = title_element.text.strip() if title_element else "Title not available"

            # Extract product description
            description_element = soup.select_one("#feature-bullets")
            description = (
                description_element.text.strip()
                if description_element
                else "Description not available"
            )

            # Extract product price
            price_element = soup.select_one("#priceblock_ourprice, .a-price .a-offscreen")
            price = price_element.text.strip() if price_element else "Price not available"

            return {
                "title": title,
                "description": description,
                "price": price,
            }
        except Exception as e:
            self._logger.exception("Error extracting product details.")
            raise e

    def scrape_product_details(self, asin_code: str) -> ProductDetails:
        """
        Retrieves product details (title, description, and price) from Amazon for a given ASIN code.

        Returns:
            ProductDetails: A Pydantic model containing the product title, description, and price.
        """
        self._logger.info(f"Scraping product details for ASIN {asin_code}..")

        try:
            driver = self._init_chrome_driver()
        except Exception as e:
            raise DriverInitializationError from e

        url = amazon_review_scraper_settings.get_amazon_product_url(asin_code)
        try:
            details = self._get_product_details(url, driver)
            return ProductDetails(**details)  # Convert dictionary to ProductDetails model
        finally:
            driver.close()