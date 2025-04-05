
import React, { useState, useEffect } from 'react';
import Logo from './components/Logo';
import CheckButton from './components/CheckButton';
import EcoResult from './components/EcoResult';
import { checkProductEcoFriendliness } from './services/ecoCheckService';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    isEcoFriendly: boolean;
    confidencePercentage: number;
    productName: string;
  } | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    // Get the current tab URL if we're in a browser extension context
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          setCurrentUrl(tabs[0].url);
        }
      });
    }
  }, []);

  const handleCheck = async () => {
    setIsLoading(true);
    try {
      
      
      // Use the currentUrl from the chrome API or fallback to a dummy URL
      const url = currentUrl || window.location.href;
      console.log('Hi');
      console.log(url);
      const data = await checkProductEcoFriendliness(url);
      setResult(data);
    } catch (error) {
      console.error('Error checking product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white min-w-[300px] max-w-[400px]">
      <Logo size="md" />
      
      <div className="w-full mt-4">
        <CheckButton onClick={handleCheck} isLoading={isLoading} />
      </div>
      
      {result && (
        <div className="w-full mt-4">
          <EcoResult 
            isEcoFriendly={result.isEcoFriendly}
            confidencePercentage={result.confidencePercentage}
            productName={result.productName}
          />
        </div>
      )}
    </div>
  );
}

export default App;
