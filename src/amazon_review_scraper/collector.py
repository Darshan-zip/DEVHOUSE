"""
    Main module for collecting Amazon Review data.
"""

import logging
from typing import List
import pandas as pd

from amazon_review_scraper.models import Review, ProductDetails
from amazon_review_scraper.scraper import AmazonReviewScraper

DEFAULT_OUTPUT_FILE = "amazon_reviews.csv"


class AmazonReviewDataCollector:
    """Data collector class for Amazon Reviews and Product Details"""

    def __init__(self) -> None:
        """Initializes the logger and scraper"""
        self._logger = logging.getLogger(__name__)
        self._scraper = AmazonReviewScraper()

    def _save_to_csv(self, product_details: ProductDetails, reviews: List[Review]) -> None:
        """
        Saves product details and reviews to a CSV file.

        Args:
            product_details (ProductDetails): The product details (title, description, price).
            reviews (List[Review]): The list of reviews for the product.
        """
        self._logger.info(f"Writing product details and {len(reviews)} reviews to the CSV file..")

        # Convert product details to a dictionary
        product_details_dict = product_details.model_dump()

        # Convert reviews to a list of dictionaries
        reviews_dicts = [review.model_dump() for review in reviews]

        # Combine product details with each review
        combined_data = []
        for review in reviews_dicts:
            combined_row = {**product_details_dict, **review}
            combined_data.append(combined_row)

        # Save combined data to a CSV file
        df = pd.DataFrame(combined_data)
        df.to_csv(DEFAULT_OUTPUT_FILE, index=False)

    def collect_amazon_review_data(self, asin_code: str) -> None:
        """
        Scrapes product details and reviews from a given Amazon product page based on the given ASIN code
        and stores them into a CSV file.

        Args:
            asin_code (str): The ASIN code of the Amazon product for which to scrape data.
        """
        self._logger.info(f"Getting Amazon product details and reviews for ASIN code {asin_code}..")

        try:
            # Scrape product details
            product_details = self._scraper.scrape_product_details(asin_code)
        except Exception:
            self._logger.exception(f"Error when scraping product details for ASIN {asin_code}.")
            return

        try:
            # Scrape reviews
            reviews = self._scraper.scrape_amazon_reviews(asin_code)
        except Exception:
            self._logger.exception(f"Error when scraping Amazon reviews for product {asin_code}.")
            return

        if not reviews:
            self._logger.info(f"No reviews found for given product {asin_code}.")
            return

        # Save product details and reviews to CSV
        self._save_to_csv(product_details, reviews)