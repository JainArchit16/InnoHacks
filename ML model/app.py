from flask import Flask, jsonify
import requests
import numpy as np
import pandas as pd
from enchant import Dict
from spellchecker import SpellChecker
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import CountVectorizer

app = Flask(__name__)

language = "en_US"  # Replace with your desired language

# Create a dictionary object
d = Dict(language)

def count_misspelled_words(text):
    spell = SpellChecker()
    words = text.split()
    misspelled = spell.unknown(words)
    return len(misspelled)

model = load_model("Model.h5")

@app.route("/get_data", methods=["GET"])
def get_data():
    try:
        # Make a GET request to the API
        response = requests.get("https://api-model-inno.onrender.com")
        
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Convert JSON response to a Python dictionary
            data = response.json()
            product = {}
            for k,v in data["message"].items():
                product[k] = v
            # print(product)
            
            data = {
                "UserId": [],
                "Image":[],
                "Seller": [],
                "misspell": [],
                "Review": [],
                }
            
            id = np.random.randint(1,3)
            for i in range(len(product)):
                data["UserId"].append(id)
                data["Image"].append(1 if product[i]["product_image_url"] is not None else 0)
                data["Seller"].append(product[i]["count"])
                data["Review"].append(product[i]["product_description"])
                data["misspell"].append(count_misspelled_words(product[i]["product_description"]))

            df = pd.DataFrame(data)
            
            scaler = StandardScaler()
            df_scaled = scaler.fit_transform(df[['UserId', 'Seller', 'Image', 'misspell']])
            max_words = 1000  # Adjust as needed
            vectorizer = CountVectorizer(max_features=max_words, stop_words='english')
            df_text = vectorizer.fit_transform(df['Review'])
            
            df_combined = pd.concat([pd.DataFrame(df_scaled), pd.DataFrame(df_text.toarray())], axis=1)
            # print("Input Data:")
            # print(df_combined)
            # print("Predictions:")
            # print(predictions)

            
            predictions = model.predict(predictions)
            # Return the data as JSON
            return jsonify(df_combined)
        else:
            return jsonify({"error": "Failed to fetch data from the API"})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
