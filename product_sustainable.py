import google.generativeai as genai
import re
import pandas as pd
genai.configure(api_key={GOOGLE_API_KEY})
def check_sustainability(each):
        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = f"Analyze the following review for sustainability, if it contains sustainable/eco-friendly keywords . Check for positivity or negativity for the review to detect greenwashing. Also give a sustainable score based on the review in the format, Credibility Score -- _/5 : {each}"
        response = model.generate_content(prompt)
        print(f"Description: {each}")
        match = re.search(r'Credibility Score -- (\d+)/5', str(response))
        #print(response)
        if match != None :
            #print(f"Score: {match.group(1)}")
            return int(match.group(1))/5*100
       

        #print(str(response)[1:-2])
'''
test_descriptions = pd.read_csv("C:/Users/VISHWA/Downloads/archive (1)/amazon_eco-friendly_products.csv").head(2)['description'].tolist()
for i in range(len(test_descriptions)):
    print(check_sustainability(test_descriptions[i]))
'''



