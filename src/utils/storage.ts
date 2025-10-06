import { STORAGE_KEYS } from './constants'; 

// Browser extension storage helper
export class Storage {
  // Get value from chrome.storage
  static async get<T>(key: string): Promise<T | null> {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        const result = await chrome.storage.local.get([key]);
        return result[key] || null;
      } else {
        // Fallback to localStorage for development
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      }
    } catch (error) {
      console.error('Error getting from storage:', error);
      return null;
    }
  }

  // Set value in chrome.storage
  static async set<T>(key: string, value: T): Promise<void> {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.local.set({ [key]: value });
      } else {
        // Fallback to localStorage for development
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error setting to storage:', error);
    }
  }

  // Remove value from chrome.storage
  static async remove(key: string): Promise<void> {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.local.remove([key]);
      } else {
        // Fallback to localStorage for development
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }

  // Clear all storage
  static async clear(): Promise<void> {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) { 
        await chrome.storage.local.clear();
      } else {
        // Fallback to localStorage for development
        localStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

// Auth-specific storage helpers
export class AuthStorage {
  static async getToken(): Promise<string | null> {
    return Storage.get<string>(STORAGE_KEYS.TOKEN);
  }

  static async setToken(token: string): Promise<void> {
    return Storage.set(STORAGE_KEYS.TOKEN, token);
  }

  static async getWalletAddress(): Promise<string | null> {
    return Storage.get<string>(STORAGE_KEYS.WALLET_ADDRESS);
  }

  static async setWalletAddress(address: string): Promise<void> {
    return Storage.set(STORAGE_KEYS.WALLET_ADDRESS, address);
  }

  static async getWallet(): Promise<string | null> {
    return Storage.get<string>(STORAGE_KEYS.WALLET);
  }

  static async setWallet(wallet: string): Promise<void> {
    return Storage.set(STORAGE_KEYS.WALLET, wallet);
  }

  static async getTokenExpires(): Promise<number | null> {
    return Storage.get<number>(STORAGE_KEYS.TOKEN_EXPIRES);
  }

  static async setTokenExpires(expires: number): Promise<void> {
    return Storage.set(STORAGE_KEYS.TOKEN_EXPIRES, expires);
  }

  static async clearAuth(): Promise<void> {
    await Promise.all([
      Storage.remove(STORAGE_KEYS.TOKEN),
      Storage.remove(STORAGE_KEYS.WALLET_ADDRESS),
      Storage.remove(STORAGE_KEYS.TOKEN_EXPIRES),
    ]);
  }

  static async isTokenValid(): Promise<boolean> {
    const expires = await this.getTokenExpires();
    if (!expires) return false;
    return Date.now() < expires;
  }
}

// ToggleTheme-specific storage helpers
export class ToggleThemeStorage {

  static async getThemeState(): Promise<string | null> {
    return Storage.get<string>(STORAGE_KEYS.THEME);
  }

  static async setThemeState(theme: string): Promise<void> {
    return Storage.set(STORAGE_KEYS.THEME, theme);
  }
}