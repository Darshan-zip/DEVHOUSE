"""
    Config module for amazon_review_scraper.
"""

from pydantic_settings import BaseSettings


class AmazonReviewScraperSettings(BaseSettings):
    """Settings class for Amazon Review Scraper"""

    base_url: str = "https://www.amazon.com"

    def get_amazon_product_url(self, asin_code: str) -> str:
        """Returns an Amazon product URL for a given ASIN code."""
        return f"{self.base_url}/dp/{asin_code}"

    def get_amazon_reviews_url(self, asin_code: str) -> str:
        """Returns an Amazon reviews URL for a given ASIN code."""
        return f"{self.base_url}/product-reviews/{asin_code}"


amazon_review_scraper_settings = AmazonReviewScraperSettings()