"""
    Module for base exception class.
"""


class BaseException(Exception):
    """Base exception class"""

    message: str = ""

    def __init__(self, message: str | None = None) -> None:
        super().__init__(message or self.message)


class DriverInitializationError(BaseException):
    """Raised when the Chrome WebDriver cannot be initialized"""
    message = "Unable to initialize Chrome WebDriver for scraping."


class ProductDetailsExtractionError(BaseException):
    """Raised when product details cannot be extracted"""
    message = "Error extracting product details from the Amazon product page."


class ReviewsExtractionError(BaseException):
    """Raised when reviews cannot be extracted"""
    message = "Error extracting reviews from the Amazon product page."