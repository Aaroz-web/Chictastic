const form=document.getElementById('tripForm');const result=document.getElementById('result');
const DESTINATIONS=[["Barcelona","Espanja",["warm","beach","food","city"]],["Malaga","Espanja",["warm","beach","food","city"]],["Valencia","Espanja",["warm","beach","food","city"]],["Mallorca","Espanja",["warm","beach","nature","golf"]],["Rooma","Italia",["warm","food","city"]],["Bologna","Italia",["food","city"]],["Florence","Italia",["food","city"]],["Sardinia","Italia",["warm","beach","nature"]],["Sisilia","Italia",["warm","beach","food","nature"]],["Ateena","Kreikka",["warm","food","city"]],["Kreeta","Kreikka",["warm","beach","nature"]],["Rodos","Kreikka",["warm","beach","golf"]],["Korfu","Kreikka",["warm","beach","nature"]],["Mykonos","Kreikka",["warm","beach","city"]],["Lisbon","Portugali",["warm","food","city"]],["Porto","Portugali",["food","city"]],["Algarve","Portugali",["warm","beach","golf","nature"]],["Berliini","Saksa",["city","food"]],["Hampuri","Saksa",["city","food"]],["München","Saksa",["city","nature"]],["Amsterdam","Alankomaat",["city","food"]],["Vienna","Itävalta",["city","food"]],["Zürich","Sveitsi",["city","nature"]],["Geneva","Sveitsi",["city","nature"]],["Praha","Tšekki",["city","food"]],["Luxembourg","Luxemburg",["city","nature"]],["Alppikylät","Sveitsi",["nature","adventure"]],["Reykjavik","Islanti",["nature","adventure","city"]],["Oslo","Norja",["nature","city"]],["Bergen","Norja",["nature","adventure"]],["Kööpenhamina","Tanska",["city","food"]],["Tukholma","Ruotsi",["city","food"]],["Gothenburg","Ruotsi",["city","food"]],["Helsinki","Suomi",["city","food"]],["Turku","Suomi",["city","food"]],["Dublin","Irlanti",["city","food"]],["Lontoo","Iso-Britannia",["city","food"]],["Pariisi","Ranska",["city","food"]],["Nizza","Ranska",["warm","beach","food","city"]],["Bordeaux","Ranska",["food","city"]],["Bruges","Belgia",["city","food"]],["Rotterdam","Alankomaat",["city","food"]],["New York","Yhdysvallat",["city","food"]],["Los Angeles","Yhdysvallat",["warm","beach","city"]],["Dallas","Yhdysvallat",["city","food"]],["Alaska","Yhdysvallat",["nature","adventure"]],["Toronto","Kanada",["city","nature"]],["Miami","Yhdysvallat",["warm","beach","city"]],["Buenos Aires","Argentiina",["warm","food","city"]],["Rio de Janeiro","Brasilia",["warm","beach","city","adventure"]],["Sapporo","Japani",["nature","food","adventure"]],["Tokio","Japani",["city","food"]],["Seoul","Etelä-Korea",["city","food"]],["Singapore","Singapore",["warm","food","city"]],["Sydney","Australia",["warm","beach","city"]],["Auckland","Uusi-Seelanti",["nature","adventure","city"]],["Wellington","Uusi-Seelanti",["nature","city"]]];
const selectedFeatured = new Set();
const FEATURED_DESTINATIONS = ['Barcelona','Mallorca','Rooma','Ateena','Lisbon','Amsterdam','Pariisi','New York','Tokio','Sydney'];
const destinationGrid = document.getElementById('allDestinationGrid');
const selectionStatus = document.getElementById('selectionStatus');
const DESTINATION_IMAGE_QUERIES={"Barcelona":"Barcelona Sagrada Familia skyline","Malaga":"Malaga Alcazaba sea view","Valencia":"Valencia City of Arts and Sciences","Mallorca":"Mallorca Cap de Formentor","Rooma":"Rome Colosseum sunset","Bologna":"Bologna skyline red rooftops","Florence":"Florence Duomo panorama","Sardinia":"Sardinia La Pelosa beach","Sisilia":"Sicily Taormina Mount Etna sea","Ateena":"Athens Acropolis sunset","Kreeta":"Crete Balos beach","Rodos":"Rhodes Lindos beach","Korfu":"Corfu Paleokastritsa bay","Mykonos":"Mykonos Little Venice sea","Lisbon":"Lisbon viewpoint sunset","Porto":"Porto Douro Dom Luis bridge sunset","Algarve":"Algarve Benagil cave beach","Berliini":"Berlin Brandenburg Gate sunset","Hampuri":"Hamburg harbor Elbphilharmonie sunset","München":"Bavaria Neuschwanstein Castle Alps","Amsterdam":"Amsterdam canals sunset","Vienna":"Vienna Schonbrunn Palace gardens","Zürich":"Zurich lake Alps panorama","Geneva":"Geneva lake Jet d'Eau Alps","Praha":"Prague Charles Bridge sunset","Luxembourg":"Luxembourg city valley panorama","Alppikylät":"Matterhorn Zermatt Alps","Reykjavik":"Iceland Reykjavik mountains ocean","Oslo":"Oslo fjord Opera House sunset","Bergen":"Bergen Norway fjord viewpoint","Kööpenhamina":"Copenhagen Nyhavn sunset","Tukholma":"Stockholm archipelago sunset","Gothenburg":"Gothenburg Sweden harbor sunset","Helsinki":"Helsinki Suomenlinna sea sunset","Turku":"Turku Finland archipelago castle","Dublin":"Dublin Cliffs of Moher Ireland","Lontoo":"London Tower Bridge Thames sunset","Pariisi":"Paris Eiffel Tower sunset","Nizza":"Nice France Promenade des Anglais Mediterranean","Bordeaux":"Bordeaux Place de la Bourse water mirror","Bruges":"Bruges Belgium canals sunset","Rotterdam":"Rotterdam Erasmus Bridge skyline sunset","New York":"New York skyline Statue of Liberty sunset","Los Angeles":"Los Angeles Griffith Observatory skyline sunset","Dallas":"Dallas skyline sunset Reunion Tower","Alaska":"Alaska mountains glacier landscape","Toronto":"Toronto skyline Lake Ontario sunset","Miami":"Miami South Beach ocean sunset","Buenos Aires":"Buenos Aires skyline sunset Puerto Madero","Rio de Janeiro":"Rio de Janeiro Copacabana Sugarloaf sunset","Sapporo":"Sapporo Japan mountain city view","Tokio":"Tokyo skyline Mount Fuji sunset","Seoul":"Seoul skyline Namsan sunset","Singapore":"Singapore Marina Bay Gardens by the Bay night","Sydney":"Sydney Opera House Harbour sunset","Auckland":"Auckland New Zealand skyline harbor sunset","Wellington":"Wellington New Zealand harbor hills sunset"};
function destinationImageUrl(city,n){
  const query=(DESTINATION_IMAGE_QUERIES[city]||city+' travel landscape').trim().replace(/\s+/g,',');
  return 'https://loremflickr.com/1200/800/'+encodeURIComponent(query)+'?lock='+(Number(n)+1);
}
function loadDestinationImage(image,city,n){
  const src=destinationImageUrl(city,n);
  image.style.backgroundImage='url("'+src.replace(/"/g,'%22')+'")';
  image.classList.add('loaded');
}
const tagText={warm:'☀️ Lämmin',beach:'🏖️ Ranta',golf:'⛳ Golf',food:'🍝 Ruoka',city:'🏙️ Kaupunki',nature:'🌿 Luonto',adventure:'🧗 Seikkailu'};
function renderDestinationCards(){
  if(!destinationGrid)return;
  destinationGrid.innerHTML='';
  DESTINATIONS.filter(d=>FEATURED_DESTINATIONS.includes(d[0])).forEach((d,n)=>{
    const card=document.createElement('button');
    card.type='button';
    card.className='featured-card';
    card.dataset.destination=d[0];
    card.setAttribute('aria-pressed','false');
    const image=document.createElement('div');
    image.className='featured-image';
    const photo=document.createElement('img');
    photo.src=destinationImageUrl(d[0],n);
    photo.alt=d[0]+' matkakohde';
    photo.loading='lazy';
    photo.referrerPolicy='no-referrer';
    photo.onerror=()=>{photo.src='https://picsum.photos/seed/'+encodeURIComponent(d[0])+'/1200/800';};
    image.appendChild(photo);
    image.innerHTML+='<span class="featured-number">'+String(n+1).padStart(2,'0')+'</span><span class="featured-check">✓</span>';
    const copy=document.createElement('div');
    copy.className='featured-copy';
    copy.innerHTML='<div><strong>'+d[0]+'</strong><small>'+d[1]+'</small></div><span class="featured-tags">'+d[2].slice(0,2).map(t=>tagText[t]).join(' · ')+'</span>';
    card.append(image,copy);
    card.addEventListener('click',()=>{
      const name=card.dataset.destination;
      if(selectedFeatured.has(name)){selectedFeatured.delete(name);card.setAttribute('aria-pressed','false')}
      else if(selectedFeatured.size<5){selectedFeatured.add(name);card.setAttribute('aria-pressed','true')}
      if(selectionStatus)selectionStatus.textContent=selectedFeatured.size+' / 5 vältettävää kohdetta valittu';
    });
    destinationGrid.appendChild(card);
  });
}
function pickDestination(data){const excluded=new Set(data.excludedDestinations||[]);const interests=data.interests||[];const pool=DESTINATIONS.filter(d=>!excluded.has(d[0]));let best=pool[0];let bestScore=-1;pool.forEach(d=>{let score=d[2].filter(t=>interests.map(x=>({Ranta:'beach',Golf:'golf',Ruoka:'food',Kaupunki:'city',Luonto:'nature',Seikkailu:'adventure'}[x])).includes(t)).length;if((data.weather||'').includes('Aurinkoinen')&&d[2].includes('warm'))score+=2;if((data.weather||'').includes('Leuto')&&d[2].includes('nature'))score+=1;score+=Math.random();if(score>bestScore){best=d;bestScore=score}});return {city:best[0],country:best[1],tags:best[2]};}
renderDestinationCards();
if(form){form.addEventListener('submit',e=>{
  e.preventDefault();
  const data={
    budget:document.getElementById('budget').value,
    duration:document.getElementById('duration')?.value||'',
    weather:document.getElementById('weather').value,
    company:document.getElementById('company').value,
    interests:[...document.querySelectorAll('.chips input:checked')].map(x=>x.value),
    excludedDestinations:[...selectedFeatured]
  };
  const destination=pickDestination(data);
  const trips=JSON.parse(localStorage.getItem('noclueTrips')||'[]');
  trips.push({...data,destination,createdAt:new Date().toISOString()});
  localStorage.setItem('noclueTrips',JSON.stringify(trips));
  result.style.display='block';
  result.innerHTML=`<div style="font-size:11px;letter-spacing:.15em;text-transform:uppercase;opacity:.7">NOCLUE AI — KOHDEVALINTA</div><h3 style="margin:8px 0;font-family:Manrope;font-size:28px">${destination.city}, ${destination.country} ✦</h3><p style="margin:0;line-height:1.6">Kohde valittiin toiveidesi perusteella. Se sopii erityisesti: ${destination.tags.filter(t=>['warm','beach','golf','food','city','nature','adventure'].includes(t)).slice(0,4).map(t=>({warm:'aurinkoiseen säähän',beach:'rantalomaan',golf:'golfiin',food:'ruokaan',city:'kaupunkilomaan',nature:'luontoon',adventure:'seikkailuun'}[t])).join(', ')}.<br><br><strong>🤫 Oikeassa NoClue-matkassa kohde pysyy matkustajalle salaisena.</strong></p><small style="display:block;margin-top:14px;opacity:.65">Valinta tehdään NoClue-kohdevalikoimasta. Tuotantoversiossa mukaan voidaan liittää myös ajantasainen lento-, hotelli- ja hintadata.</small>`;
  result.scrollIntoView({behavior:'smooth',block:'center'});
})}

const observer=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.step-card,.about-grid>div,.competitor-row>div,.destination-group').forEach(el=>{el.classList.add('reveal');observer.observe(el)});

// NoClue Abroad language switcher
const translations={
  "How it works":"Miten se toimii","About us":"Meistä","Business plan":"Liiketoimintasuunnitelma","Financial plan":"Talouslaskelma","Start":"Aloita","Plan your trip":"Suunnittele matka",
  "A new way to travel":"Uusi tapa matkustaa","You know what you want.":"Tiedät mitä haluat.","You don't know where you're going.":"Et tiedä minne olet menossa.","Tell us what kind of trip you want. We handle the destination. You get the surprise.":"Kerro meille millaisen matkan haluat. Me hoidamme kohteen. Sinä saat yllätyksen.",
  "Plan a surprise trip":"Suunnittele yllätysmatka","See how it works":"Katso miten se toimii","DEPARTURE":"LÄHTÖ","DESTINATION":"KOHDE","Secret":"Salainen","Revealed later":"Selviää myöhemmin",
  "How it works":"Miten se toimii","You choose the ":"Sinä päätät ","feeling.":"fiiliksen.","We choose the place.":"Me päätämme paikan.","No hours of browsing hotels. No dozens of tabs. Tell us what matters and let us build the trip.":"Ei tuntikausien hotellien selaamista. Ei kymmeniä välilehtiä. Kerro tärkeimmät toiveesi ja anna meidän rakentaa niistä matka.",
  "Tell us what you want":"Kerro mitä haluat","We choose the destination":"Me valitsemme kohteen","You leave":"Sinä lähdet",
  "Where do we ":"Minne me ","travel?":"matkustamme?","What kind of trip":"Millainen matka","are you interested in?":"sinua kiinnostaa?",
  "When are you travelling?":"Milloin matkustat?","Choose your departure date and then your return date.":"Valitse lähtöpäivä ja sen jälkeen paluupäivä.","Choose dates":"Valitse päivät",
  "What's your budget?":"Mikä on budjettisi?","Set your maximum budget.":"Aseta enimmäisbudjettisi.",
  "What kind of weather?":"Millainen sää?","Sunny and warm":"Aurinkoinen ja lämmin","Mild":"Leuto","No preference":"Ei väliä",
  "Travel companions":"Matkaseura","Friends":"Ystävät","Partner":"Puoliso","Family":"Perhe","Alone":"Yksin",
  "What do you want to do?":"Mitä haluat tehdä?","Select all that apply":"Valitse kaikki sopivat","Beach":"Ranta","Food":"Ruoka","City":"Kaupunki","Nature":"Luonto","Adventure":"Seikkailu","Lock in my preferences":"Lukitse toiveeni",
  "ABOUT US":"MEISTÄ","What is ":"Mikä on ","BUSINESS ANALYSIS":"YRITYSANALYYSI","BUSINESS PLAN":"LIIKETOIMINTASUUNNITELMA","Our ":"Meidän ","idea.":"ideamme.","Our company":"Yrityksemme",
  "Strengths":"Vahvuudet","Weaknesses":"Heikkoudet","Opportunities":"Mahdollisuudet","Threats":"Uhat",
  "What do we sell?":"Mitä myymme?","How does it work?":"Miten idea toimii?","How do we find the trip?":"Miten löydämme matkan?","What makes us different?":"Mikä tekee meistä erilaisen?",
  "FINANCIAL PLAN":"YRITYKSEN TALOUS","Summary":"Yhteenveto","Revenue":"Liikevaihto","Variable costs":"Muuttuvat kulut","Fixed costs":"Kiinteät kulut","Total margin":"Kate yhteensä","PROFIT / LOSS WITHOUT EMPLOYEE":"VOITTO / TAPPIO ILMAN TYÖNTEKIJÄÄ","Total":"Yhteensä","electricity":"sähkö","Employee":"Henkilöstö","insurance":"vakuutukset","marketing":"markkinointi","Loan costs":"Lainakulut",
  "Plan your trip":"Suunnittele matka","What is NoClue Abroad?":"Mikä on NoClue Abroad?","Our company":"Yrityksemme","Service":"Palvelu",
  "© 2026 NoClue Abroad":"© 2026 NoClue Abroad"
};
function replaceText(lang){
  const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  while(walk.nextNode()){
    const n=walk.currentNode;
    if(n.parentElement.closest(".lang-switch")) continue;
    let v=n.textContent;
    if(lang==="fi"){
      Object.entries(translations).forEach(([en,fi])=>{ if(v.includes(en)) v=v.split(en).join(fi); });
    }else{
      Object.entries(translations).forEach(([en,fi])=>{ if(v.includes(fi)) v=v.split(fi).join(en); });
    }
    n.textContent=v;
  }
}
function applyLanguage(lang){
  replaceText(lang);
  document.documentElement.lang=lang;
  localStorage.setItem("noclueLanguage",lang);
  const b=document.querySelector(".lang-switch");
  if(b) b.textContent=lang==="en"?"🇫🇮 FI":"🇬🇧 EN";
}
function setupLanguageSwitch(){
  const nav=document.querySelector(".nav");
  if(!nav||document.querySelector(".lang-switch")) return;
  const b=document.createElement("button");
  b.className="lang-switch";
  b.type="button";
  b.setAttribute("aria-label","Vaihda kieltä / Change language");
  b.addEventListener("click",()=>{
    const next=document.documentElement.lang==="en"?"fi":"en";
    applyLanguage(next);
  });
  const style=document.createElement("style");
  style.textContent=".lang-switch{border:1px solid #d9dcd6;background:#fff;color:#17231f;border-radius:999px;padding:10px 13px;font:700 12px \"DM Sans\",sans-serif;cursor:pointer;transition:.2s;white-space:nowrap}.lang-switch:hover{transform:translateY(-2px);box-shadow:0 8px 20px #17231f18}.nav{gap:14px}@media(max-width:800px){.lang-switch{padding:9px 11px}}";
  document.head.appendChild(style);
  nav.appendChild(b);
  const saved=localStorage.getItem("noclueLanguage")||"en";
  document.documentElement.lang="en";
  if(saved==="fi") replaceText("fi");
  document.documentElement.lang=saved;
  b.textContent=saved==="en"?"🇫🇮 FI":"🇬🇧 EN";
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",setupLanguageSwitch); else setupLanguageSwitch();
