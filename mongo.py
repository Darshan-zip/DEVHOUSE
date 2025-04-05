from pymongo import MongoClient
from pprint import pprint
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
def fetch_db(product):
    try:
        client = MongoClient("mongodb://127.0.0.1:27017/", serverSelectionTimeoutMS=3000)
        client.admin.command("ping")
        print("✅ Connected to MongoDB!")
    except ConnectionFailure as e:
        print("❌ Failed to connect:", e)


    # Replace with your friend's IP address
    client = MongoClient("mongodb://127.0.0.1:27017/")

    # Access the correct database and collection
    db = client["certDB"]
    collection = db["files"]
    # Fetch and print all documents
    data=collection.find_one({"product_name":product})
    if(data==None):
        return -1
    return 1
