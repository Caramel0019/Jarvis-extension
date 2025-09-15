chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
  
  // Initialize storage with default values
  chrome.storage.local.set({
    isEnabled: true,
    stats: { active: 0, pending: 0 }
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStats') {
    // Handle stats request
    chrome.storage.local.get(['stats'], (result) => {
      sendResponse(result.stats || { active: 0, pending: 0 })
    })
    return true // Keep message channel open for async response
  }
  
  if (request.action === 'updateStats') {
    chrome.storage.local.set({ stats: request.stats })
    sendResponse({ success: true })
  }
})

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // This will only fire if no popup is set in manifest
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html#home') })
})