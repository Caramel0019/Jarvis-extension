const WEB_API_BASE_URL = 'https://jarvis-web1.vercel.app';

interface MessageData {
  action: string;
  data?: any;
  token?: string;
}

// Generate secure token for session
const generateToken = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Store current session token
let sessionToken: string | null = null; 

// Listen for messages from extension popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "open_auth") {
    sessionToken = generateToken();
    
    const authUrl = `${WEB_API_BASE_URL}/auth?token=${sessionToken}`;
    window.open(authUrl, "auth_window", "width=450,height=600");

    // Send init message to webapp
    setTimeout(() => {
      window.postMessage({
        source: "my-extension",
        type: "init",
        token: sessionToken
      }, "*");
    }, 1000);
    
    sendResponse({ status: "auth_opened", token: sessionToken });
  }
  
  if (request.action === "open_payment") {
    sessionToken = generateToken();
    const { amount, wallet } = request.data;
    const paymentUrl = `${WEB_API_BASE_URL}/payment?token=${sessionToken}&amount=${amount}&wallet=${wallet}`;
    window.open(paymentUrl, "payment_window", "width=450,height=600");
    
    sendResponse({ status: "payment_opened", token: sessionToken });
  }
  
  return true;
});

// Listen for messages from webapp
window.addEventListener("message", (event) => {
  // Verify origin
  if (event.origin !== `${WEB_API_BASE_URL}`) return;
  
  const message = event.data;
  if (message.source !== "my-webapp") return;
  
  // Forward to extension popup
  chrome.runtime.sendMessage({
    type: message.type,
    data: message.data,
    timestamp: message.timestamp
  });
});

// Inject security script to prevent direct access
const securityScript = document.createElement("script");
securityScript.textContent = `
  // Block direct navigation to protected routes
  if (window.location.pathname === '/auth' || window.location.pathname === '/payment') {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (!token || !window.opener) {
      window.location.href = '/';
    }
  }
`;
document.documentElement.appendChild(securityScript);
securityScript.remove();