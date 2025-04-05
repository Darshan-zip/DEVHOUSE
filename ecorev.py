import re
import nltk
import torch
from transformers import pipeline

# Download required NLTK data
#nltk.download('punkt')

# 1. Define eco-friendly keywords


def contains_eco_keywords(text):
    """Returns True if eco-friendly keywords are found in the text."""
    ECO_KEYWORDS = [
    "biodegradable", "compostable", "eco-friendly", "sustainable",
    "low carbon", "carbon neutral", "recyclable", "organic",
    "green product", "environmentally safe", "plant-based", "zero waste",
    "renewable", "reusable", "non-toxic", "clean energy", 
    "energy efficient", "eco-conscious", "natural ingredients", 
    "fair trade", "locally sourced", "upcycled", "minimal packaging", 
    "responsibly sourced", "environmentally friendly", "green-certified",
    "climate positive", "plastic-free", "water-saving", "ethically made",
    "forest-friendly", "carbon footprint", "net zero", "sustainable packaging",
    "circular economy", "low impact", "green living"
]

    for keyword in ECO_KEYWORDS:
        match = re.search(r'\b' + re.escape(keyword) + r'\b', text, re.IGNORECASE)
        if match != None:
            return True,str(match.group(0))
        
    return False,None

# 2. Load sentiment analysis model (using HuggingFace transformers)
sentiment_pipeline = pipeline("sentiment-analysis")

def get_sentiment(text):
    """Returns 'POSITIVE', 'NEGATIVE', or 'NEUTRAL' sentiment from the review."""
    result = sentiment_pipeline(text[:512])[0]  # Trim to model input limit
    label = result['label']
    return label

# 3. Main classifier
def classify_review(text):
    has_keywords,matched_sentence = contains_eco_keywords(text)
    
    
    if has_keywords:
        sentiment = get_sentiment(matched_sentence)
        if sentiment == "POSITIVE":
            return "Eco-Friendly (Positive Affirmation)"
        elif sentiment == "NEGATIVE":
            return "Not Eco-Friendly (Negative Experience)"
        else:
            return "Uncertain"
    else:
        return "Not Eco-Related"
'''
# 4. Test the model
reviews = [
    "This shampoo is biodegradable and smells great!",
    "It claims to be sustainable but came in plastic packaging.",
    "I love the scent but it doesn't mention being eco-friendly.",
    "Packaging was all recyclable and zero waste—very happy with it!",
    "This product says eco but feels like greenwashing.",
    "The product is amazing but not eco-friendly at all.",
]

for review in reviews:
    print(f"\nReview: {review}")
    print("→ Classification:", classify_review(review))'''
