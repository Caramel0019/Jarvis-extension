import { useState, useEffect } from 'react'

export const useExtensionAPI = () => {
  const [isExtensionContext, setIsExtensionContext] = useState(false)

  useEffect(() => {
    setIsExtensionContext(typeof chrome !== 'undefined' && !!chrome.runtime?.id)
  }, [])

  const sendMessage = (message: any): Promise<any> => {
    return new Promise((resolve) => {
      if (isExtensionContext) {
        chrome.runtime.sendMessage(message, resolve)
      } else {
        resolve(null)
      }
    })
  }

  const openTab = (url: string) => {
    if (isExtensionContext) {
      chrome.tabs.create({ url })
    } else {
      window.open(url, '_blank')
    }
  }

  return { isExtensionContext, sendMessage, openTab }
}