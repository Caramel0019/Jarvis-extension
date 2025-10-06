export class MessageListener {
  private callbacks: Map<string, (data: any) => void> = new Map();
  private listener: any;

  constructor() {
    // Listen for messages from content script
    this.listener = (message: any) => {
      if (message.type && this.callbacks.has(message.type)) {
        const callback = this.callbacks.get(message.type);
        if (callback) {
          callback(message.data);
        }
      }
    };

    chrome.runtime.onMessage.addListener(this.listener);
  }

  onMessage(callback: (type: string, data: any) => void) {
    // Generic handler for all message types
    const types = ["wallet_connected", "payment_result"];
    types.forEach(type => {
      this.callbacks.set(type, (data) => callback(type, data));
    });
  }

  cleanup() {
    if (this.listener) {
      chrome.runtime.onMessage.removeListener(this.listener);
    }
    this.callbacks.clear();
  }
}