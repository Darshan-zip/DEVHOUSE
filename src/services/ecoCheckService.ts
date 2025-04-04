
interface EcoCheckResult {
  isEcoFriendly: boolean;
  confidencePercentage: number;
  productName: string;
}

// This would be replaced with actual API call in production
export const checkProductEcoFriendliness = async (url: string): Promise<EcoCheckResult> => {
  console.log('Checking URL:', url);
  
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // This is mock data - would be replaced with actual API response
      const mockResponses = [
        {
          isEcoFriendly: true,
          confidencePercentage: 92,
          productName: "Eco-Friendly Bamboo Water Bottle"
        },
        {
          isEcoFriendly: false,
          confidencePercentage: 87,
          productName: "Plastic Single-Use Container"
        },
        {
          isEcoFriendly: true,
          confidencePercentage: 75,
          productName: "Recycled Paper Notebook"
        }
      ];
      
      // Select random mock response for demo purposes
      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      resolve(mockResponses[randomIndex]);
    }, 1500); // Simulate network delay
  });
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
