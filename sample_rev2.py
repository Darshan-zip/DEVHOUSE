from transformers import pipeline
import ecorev
import predict_real
import warnings

classifier = pipeline("zero-shot-classification")
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")
warnings.filterwarnings("ignore", category=UserWarning, module="transformers")
def get_aspect_sentiment(reviews,text, aspect="eco-friendliness"):
    reviews = predict_real.predict_real_reviews(reviews)
    #print("real reviews: ",reviews)
    eco_reviews = []
    for review in reviews:
        if ecorev.contains_eco_keywords(review)[0]:
            eco_reviews.append(review)
    #print("eco reviews: ",eco_reviews)
    sentiments = {}
    
    for text in eco_reviews:

        candidate_labels = ["positive", "negative", "neutral"]
        result = classifier(text, candidate_labels, hypothesis_template=f"The sentiment about {aspect} is {{}}.")
        sentiments[text] = result['labels'][0] 
         # Best matching sentiment
    return sentiments
'''
reviews = [
    "it is not just eco-friendly as it claims to be but also amazingly effective.",
    "The product is amazing but not eco-friendly at all.",
    "It's a sustainable and eco-friendly product!",
    "Wow, it really is thin and low profile. The money strap works great and the wallet holds everything. Prefect for a front pocket! I highly recommend. The price is amazing for the quality you get."
]

print(get_aspect_sentiment(reviews,"eco-friendliness"))'''



