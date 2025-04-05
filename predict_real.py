import joblib

def predict_real_reviews(reviews):
    # Load model and fitted vectorizer
    model = joblib.load("C:/Users/VISHWA/OneDrive/Desktop/ecospy/review_model.pkl")
    tfidf = joblib.load("C:/Users/VISHWA/OneDrive/Desktop/ecospy/vectorizer.pkl")

    # Use the loaded vectorizer to transform input reviews
    results = model.predict(tfidf.transform(reviews))

    # Filter out real reviews
    real_reviews = [reviews[i] for i in range(len(results)) if results[i] == 1]
    return real_reviews

# Sample test data
'''test_reviews = [
    "This product is amazing! I use it every day and it works perfectly.",
    "Worst thing ever. I got paid to write this fake review.",
    "Fantastic quality and fast delivery. Highly recommended.",
    "Do not buy this. Just promoting for money.",
    "Great big numbers & easy to read, the only thing I didn't like is the size of the",
    "Great big numbers & easy to read, the only thing I didn't like is the size of the product",
    "My son loves this comforter and it is very well made. We also have a baby",
    "This was one of my favorites in the series reading it this time around...",
    "Meh,it is kinda okayish!",
    "These biodegradable trash bags are a game changer..."
]

# ✅ Now just call with the raw reviews
print(predict_real_reviews(test_reviews))'''
