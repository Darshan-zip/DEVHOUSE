"""
    Main module for amazon_review_scraper.
"""

import logging

import click

from amazon_review_scraper.collector import AmazonReviewDataCollector


logging.basicConfig(level=logging.INFO)


@click.command()
@click.option(
    "--asin-code",
    help="The ASIN code of the product for which to scrape Amazon product details and reviews.",
    required=True,
)
def scrape_amazon_data(asin_code: str) -> None:
    """
    Scrapes product details and reviews for a given ASIN code and saves them to a CSV file.
    """
    collector = AmazonReviewDataCollector()
    collector.collect_amazon_review_data(asin_code)


if __name__ == "__main__":
    scrape_amazon_data()