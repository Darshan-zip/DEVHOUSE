
// EcoAware Service Worker
// This runs in the background of the extension

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('EcoAware Extension installed');
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_CURRENT_URL') {
    // Get the current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        sendResponse({ url: tabs[0].url });
      } else {
        sendResponse({ url: '', error: 'No active tab found' });
      }
    });
    // Return true to indicate we will send a response asynchronously
    return true;
  }
  
  return false;
});

// Log when the service worker starts
console.log('EcoAware service worker started');
