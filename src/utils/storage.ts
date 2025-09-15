export class ExtensionStorage {
  static async get<T>(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] || null)
      })
    })
  }

  static async set(key: string, value: any): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve()
      })
    })
  }

  static async remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.remove([key], () => {
        resolve()
      })
    })
  }

  static async clear(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve()
      })
    })
  }
}