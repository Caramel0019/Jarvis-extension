// Content script for interacting with web pages
console.log('Content script loaded')

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkPageStatus') {
    // Example: Check if current page has certain elements
    const hasTargetElements = document.querySelectorAll('[data-extension-target]').length > 0
    sendResponse({ hasTargetElements })
  }
})

// Example: Add a floating button to pages
const addFloatingButton = () => {
  const button = document.createElement('div')
  button.id = 'extension-floating-btn'
  button.innerHTML = '🚀'
  button.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #3B82F6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10000;
    font-size: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `
  
  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openMainPage' })
  })
  
  document.body.appendChild(button)
}

// Check if extension is enabled before adding UI elements
chrome.storage.local.get(['isEnabled'], (result) => {
  if (result.isEnabled) {
    addFloatingButton()
  }
})