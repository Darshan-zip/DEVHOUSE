"""
    Pydantic models for Amazon Review scraper.
"""

from pydantic import BaseModel


class Review(BaseModel):
    author: str
    content: str
    rating: float  # Changed to float to support ratings like "4.5 out of 5"
    title: str


class ProductDetails(BaseModel):
    title: str
    description: str
    price: str