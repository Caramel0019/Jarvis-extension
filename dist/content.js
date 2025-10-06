const a="https://jarvis-web1.vercel.app",r=()=>Date.now().toString(36)+Math.random().toString(36).substring(2);let t=null;chrome.runtime.onMessage.addListener((e,n,s)=>{if(e.action==="open_auth"){t=r();const o=`${a}/auth?token=${t}`;window.open(o,"auth_window","width=450,height=600"),setTimeout(()=>{window.postMessage({source:"my-extension",type:"init",token:t},"*")},1e3),s({status:"auth_opened",token:t})}if(e.action==="open_payment"){t=r();const{amount:o,wallet:m}=e.data,c=`${a}/payment?token=${t}&amount=${o}&wallet=${m}`;window.open(c,"payment_window","width=450,height=600"),s({status:"payment_opened",token:t})}return!0});window.addEventListener("message",e=>{if(e.origin!==`${a}`)return;const n=e.data;n.source==="my-webapp"&&chrome.runtime.sendMessage({type:n.type,data:n.data,timestamp:n.timestamp})});const i=document.createElement("script");i.textContent=`
  // Block direct navigation to protected routes
  if (window.location.pathname === '/auth' || window.location.pathname === '/payment') {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (!token || !window.opener) {
      window.location.href = '/';
    }
  }
`;document.documentElement.appendChild(i);i.remove();
