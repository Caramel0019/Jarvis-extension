console.log("Content script loaded");chrome.runtime.onMessage.addListener((e,i,t)=>{if(e.action==="checkPageStatus"){const n=document.querySelectorAll("[data-extension-target]").length>0;t({hasTargetElements:n})}});const o=()=>{const e=document.createElement("div");e.id="extension-floating-btn",e.innerHTML="🚀",e.style.cssText=`
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
  `,e.addEventListener("click",()=>{chrome.runtime.sendMessage({action:"openMainPage"})}),document.body.appendChild(e)};chrome.storage.local.get(["isEnabled"],e=>{e.isEnabled&&o()});
