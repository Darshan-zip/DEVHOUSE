// background.js

console.log('Service Worker is running!');

chrome.runtime.onInstalled.addListener(() => {
    console.log('Eco-Aware Web Checker installed.');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^https?:\/\//.test(tab.url)) {
        console.log(`Tab updated: ${tab.url}`);
    }
});
