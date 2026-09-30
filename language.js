(function(){
  function translate(value,lang){
    const pairs=window.NOCLUE_LANGUAGE_PAIRS||[];
    let out=value||"";
    for(const p of pairs){
      const from=lang==="en"?p[0]:p[1];
      const to=lang==="en"?p[1]:p[0];
      if(from) out=out.split(from).join(to);
    }
    return out;
  }
  const originals=new WeakMap();
  function setLanguage(lang){
    const next=lang==="en"?"en":"fi";
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const n=walker.currentNode;
      if(n.parentElement && n.parentElement.closest("#languageSwitch,script,style")) continue;
      if(!originals.has(n)) originals.set(n,n.nodeValue);
      n.nodeValue=translate(originals.get(n),next);
    }
    document.documentElement.lang=next;
    localStorage.setItem("noclueLanguage",next);
    const b=document.getElementById("languageSwitch");
    if(b){
      const s=b.querySelector("span");
      if(s)s.textContent=next==="en"?"FI":"EN";
      b.setAttribute("aria-label",next==="en"?"Vaihda suomeksi":"Switch to English");
    }
  }
  window.toggleNoClueLanguage=function(e){
    if(e){e.preventDefault();e.stopPropagation();}
    setLanguage(document.documentElement.lang==="en"?"fi":"en");
    return false;
  };
  function init(){
    const b=document.getElementById("languageSwitch");
    if(!b)return;
    const saved=localStorage.getItem("noclueLanguage");
    setLanguage(saved==="en"?"en":"fi");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();