
export const sendMessageWithRetry = (
  tabId: number,
  message: any,
  maxRetries = 5,
  delay = 500
): Promise<any> => {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const trySend = () => {
      chrome.tabs.sendMessage(tabId, message, (response) => {
        if (chrome.runtime.lastError) {
          attempts++;
          if (attempts < maxRetries) {
            console.warn(
              `Retrying sendMessage... attempt ${attempts}, error: ${chrome.runtime.lastError.message}`
            );
            setTimeout(trySend, delay);
          } else {
            reject(new Error(`Failed after ${maxRetries} retries`));
          }
        } else {
          resolve(response);
        }
      });
    };

    trySend();
  });
};
