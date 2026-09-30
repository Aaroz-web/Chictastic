(function(){
  function setup(){
    const button=document.querySelector('.nca-language-button');
    if(!button) return;
    button.type='button';
    button.style.pointerEvents='auto';
    button.onclick=function(event){
      event.preventDefault();
      event.stopPropagation();
      try{
        const current=document.documentElement.lang==='en'?'en':'fi';
        if(typeof window.ncaSetLanguage==='function'){
          window.ncaSetLanguage(current==='en'?'fi':'en');
        }
      }catch(error){
        console.error('NoClue language switcher error:',error);
      }
      return false;
    };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup,{once:true});
  else setup();
})();
