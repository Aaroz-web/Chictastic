/* NoClue Abroad language switcher — reliable repeated FI/EN switching */
const LANGUAGE_PAIRS = [
["Miten se toimii","How it works"],["Meistä","About us"],["Liiketoimintasuunnitelma","Business plan"],["Talouslaskelma","Financial plan"],["Aloita","Start"],["Suunnittele matka","Plan your trip"],
["Uusi tapa matkustaa","A new way to travel"],["Tiedät mitä haluat.","You know what you want."],["Et tiedä minne olet menossa.","You don't know where you're going."],
["Kerro meille millaisen matkan haluat. Me hoidamme kohteen. Sinä saat yllätyksen.","Tell us what kind of trip you want. We handle the destination. You get the surprise."],
["Suunnittele yllätysmatka","Plan a surprise trip"],["Katso miten se toimii","See how it works"],["LÄHTÖ","DEPARTURE"],["KOHDE","DESTINATION"],["Salainen","Secret"],["Selviää myöhemmin","Revealed later"],
["Sinä päätät ","You choose the "],["fiiliksen.","feeling."],["Me päätämme paikan.","We choose the place."],
["Ei tuntikausien hotellien selaamista. Ei kymmeniä välilehtiä. Kerro tärkeimmät toiveesi ja anna meidän rakentaa niistä matka.","No hours of browsing hotels. No dozens of tabs. Tell us what matters and let us build the trip."],
["Kerro mitä haluat","Tell us what you want"],["Me valitsemme kohteen","We choose the destination"],["Sinä lähdet","You leave"],
["Minne me ","Where do we "],["matkustamme?","travel?"],["KOHTEET","DESTINATIONS"],["Sinun vuorosi","Your turn"],["Millainen matka","What kind of trip"],["sinua kiinnostaa?","are you interested in?"],
["Täytä toiveesi. Päivämäärät ja budjetti ovat matkan lähtökohta.","Fill in your wishes. Dates and budget are the starting point for the trip."],
["Milloin matkustat?","When are you travelling?"],["Valitse lähtöpäivä ja sen jälkeen paluupäivä.","Choose your departure date and then your return date."],["Valitse päivät","Choose dates"],["Edellinen kuukausi","Previous month"],["Seuraava kuukausi","Next month"],["Kuukausi","Month"],
["Mikä on budjettisi?","What's your budget?"],["Aseta enimmäisbudjettisi.","Set your maximum budget."],["Millainen sää?","What kind of weather?"],["Aurinkoinen ja lämmin","Sunny and warm"],["Leuto","Mild"],["Ei väliä","No preference"],
["Matkaseura","Travel companions"],["Ystävät","Friends"],["Puoliso","Partner"],["Perhe","Family"],["Yksin","Alone"],
["Mitä haluat tehdä?","What do you want to do?"],["Valitse kaikki sopivat","Select all that apply"],["Ranta","Beach"],["Golf","Golf"],["Ruoka","Food"],["Kaupunki","City"],["Luonto","Nature"],["Seikkailu","Adventure"],["Lukitse toiveeni","Lock in my preferences"],
["Vahvuudet","Strengths"],["Heikkoudet","Weaknesses"],["Mahdollisuudet","Opportunities"],["Uhat","Threats"],
["Vastuullisuus","Responsibility"],["09 — VASTUULLISUUS","09 — RESPONSIBILITY"]
];

const NCA_TEXT_ORIGINAL=new WeakMap();
const NCA_ATTR_ORIGINAL=new WeakMap();
const NCA_TRANSLATABLE_ATTRS=["placeholder","title","aria-label","alt"];

function ncaTranslate(value,language){
  if(!value)return value;
  let result=value;
  const ordered=LANGUAGE_PAIRS.slice().sort((a,b)=>b[0].length-a[0].length);
  for(const [fi,en] of ordered){
    result=result.split(language==="en"?fi:en).join(language==="en"?en:fi);
  }
  return result;
}
function ncaTranslateTree(root,language){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
    const node=walker.currentNode,parent=node.parentElement;
    if(parent&&(parent.closest(".nca-language-button")||parent.closest("script,style")))continue;
    if(!NCA_TEXT_ORIGINAL.has(node))NCA_TEXT_ORIGINAL.set(node,node.nodeValue);
    node.nodeValue=ncaTranslate(NCA_TEXT_ORIGINAL.get(node),language);
  }
  root.querySelectorAll(NCA_TRANSLATABLE_ATTRS.map(a=>"["+a+"]").join(",")).forEach(el=>{
    if(el.classList.contains("nca-language-button"))return;
    let originals=NCA_ATTR_ORIGINAL.get(el);
    if(!originals){originals={};NCA_ATTR_ORIGINAL.set(el,originals);}
    NCA_TRANSLATABLE_ATTRS.forEach(attr=>{
      if(el.hasAttribute(attr)){
        if(originals[attr]===undefined)originals[attr]=el.getAttribute(attr);
        el.setAttribute(attr,ncaTranslate(originals[attr],language));
      }
    });
  });
}
function ncaTranslateSpecialElements(language){
  const pairs=[
    [".swot-header h1","SWOT-<em>analyysi.</em>","SWOT <em>analysis.</em>"],
    [".feedback-header h1","Vertais<em>palaute.</em>","Peer <em>feedback.</em>"],
    [".responsibility-header h1","Vastuul<em>lisuus.</em>","Responsibi<em>lity.</em>"]
  ];
  pairs.forEach(([selector,fi,en])=>{
    document.querySelectorAll(selector).forEach(el=>el.innerHTML=language==="en"?en:fi);
  });
}
function ncaSetLanguage(language){
  const lang=language==="en"?"en":"fi";
  document.documentElement.lang=lang;
  ncaTranslateTree(document.body,lang);
  ncaTranslateSpecialElements(lang);
  try{localStorage.setItem("noclueLanguage",lang);}catch(e){}
  document.querySelectorAll(".nca-language-button").forEach(button=>{
    button.dataset.language=lang;
    button.textContent=lang==="fi"?"🇬🇧 EN":"🇫🇮 FI";
    button.setAttribute("aria-label",lang==="fi"?"Switch to English":"Vaihda suomeksi");
    button.title=lang==="fi"?"Switch to English":"Vaihda suomeksi";
  });
}
function ncaToggleLanguage(event){
  if(event){event.preventDefault();event.stopImmediatePropagation();}
  const button=event&&event.currentTarget&&event.currentTarget.classList.contains("nca-language-button")?event.currentTarget:null;
  const current=button?.dataset.language||document.documentElement.lang||"fi";
  ncaSetLanguage(current==="en"?"fi":"en");
}
window.ncaSetLanguage=ncaSetLanguage;
window.ncaToggleLanguage=ncaToggleLanguage;

function ncaSetupLanguage(){
  document.querySelectorAll(".nca-language-button").forEach(button=>{
    if(button.parentElement!==document.body)document.body.appendChild(button);
    button.style.position="fixed";
    button.style.top="12px";
    button.style.right="20px";
    button.style.zIndex="2147483647";
    button.style.pointerEvents="auto";
    button.onclick=ncaToggleLanguage;
  });
  let saved="fi";
  try{saved=localStorage.getItem("noclueLanguage")||"fi";}catch(e){}
  ncaSetLanguage(saved==="en"?"en":"fi");
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ncaSetupLanguage,{once:true});
else ncaSetupLanguage();
