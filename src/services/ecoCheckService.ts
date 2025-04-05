import * as fs from 'fs';

  
import axios from 'axios';

interface EcoCheckResult {
  isEcoFriendly: boolean;
  confidencePercentage: number;
  productName: string;
}

async function fetchDataFromFlask() {
  try {
    const res = await fetch("http://localhost:8000/get-data");
    const text = await res.text();

    console.log("Raw response from Flask:", text);

    try {
      const json = JSON.parse(text);
      console.log("Parsed JSON from Flask:", json);

      // Display in popup if needed
      const displayEl = document.getElementById("score");
      if (displayEl) {
        displayEl.textContent = `Sustainability Score: ${json.data}`;
      }

      // ✅ Return the parsed data
      return json;

    } catch (parseErr) {
      console.error("JSON parsing failed:", parseErr);
      throw parseErr; // Rethrow if needed
    }

  } catch (fetchErr) {
    console.error("Fetch failed:", fetchErr);
    throw fetchErr; // Rethrow so caller can handle
  }
}


// This would be replaced with actual API call in production
export const checkProductEcoFriendliness = async (url: string): Promise<EcoCheckResult> => {
  
  
  console.log('Checking URL1:', url);


  axios.post("http://localhost:5000/receive-data", url, {
    headers: {
      "Content-Type": "text/plain", // Important for raw text
    },
  })
  .then((response) => {
    console.log("Response from Python:", response.data);
  })
  .catch((error) => {
    console.error("Error sending data:", error);
  });

  

  try {
    // Await the result from Flask
    const data = await fetchDataFromFlask(); // Correctly await

    // Now safely access the returned data
    const mockResponse = {
      isEcoFriendly: data.data[0] > 60,           // Assuming `data.data` is the score
      confidencePercentage: data.data[0],
      productName: data.data[1] || "Unknown"      // Optional fallback
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockResponse);
      }, 1500); // Simulate network delay
    });

  } catch (err) {
    console.error("Error during eco-friendliness check:", err);
    throw err;
  }
};

export const extractProductNameFromUrl = (url: string): string => {
  try {
    // Basic extraction - would be more sophisticated in production
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(part => part.length > 0);
    
    // Very simple heuristic for demo
    const lastPart = pathParts[pathParts.length - 1];
    return lastPart ? lastPart.replace(/-/g, ' ') : 'Unknown Product';
  } catch (e) {
    console.error('Error extracting product name:', e);
    return 'Unknown Product';
  }
};

export const getCurrentTabUrl = (): Promise<string> => {
  // In a real extension, this would use the browser extension API
  // For our demo, we'll just return the current window location
  console.log(window.location.href);
  return Promise.resolve(window.location.href);
};
