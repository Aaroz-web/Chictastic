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

// NoClue Abroad language switcher — Finnish source text stays intact; English is a toggle translation.
const LANGUAGE_PAIRS = [
  ["Miten se toimii","How it works"],["Meistä","About us"],["Liiketoimintasuunnitelma","Business plan"],["Talouslaskelma","Financial plan"],["Aloita","Start"],["Suunnittele matka","Plan your trip"],
  ["Uusi tapa matkustaa","A new way to travel"],["Tiedät mitä haluat.","You know what you want."],["Et tiedä minne olet menossa.","You don't know where you're going."],
  ["Kerro meille millaisen matkan haluat. Me hoidamme kohteen. Sinä saat yllätyksen.","Tell us what kind of trip you want. We handle the destination. You get the surprise."],
  ["Suunnittele yllätysmatka","Plan a surprise trip"],["Katso miten se toimii","See how it works"],["LÄHTÖ","DEPARTURE"],["KOHDE","DESTINATION"],["Salainen","Secret"],["Selviää myöhemmin","Revealed later"],
  ["Sinä päätät ","You choose the "],["fiiliksen.","feeling."],["Me päätämme paikan.","We choose the place."],
  ["Ei tuntikausien hotellien selaamista. Ei kymmeniä välilehtiä. Kerro tärkeimmät toiveesi ja anna meidän rakentaa niistä matka.","No hours of browsing hotels. No dozens of tabs. Tell us what matters and let us build the trip."],
  ["Kerro mitä haluat","Tell us what you want"],["Me valitsemme kohteen","We choose the destination"],["Sinä lähdet","You leave"],
  ["Minne me ","Where do we "],["matkustamme?","travel?"],["Millainen matka","What kind of trip"],["sinua kiinnostaa?","are you interested in?"],
  ["Milloin matkustat?","When are you travelling?"],["Valitse lähtöpäivä ja sen jälkeen paluupäivä.","Choose your departure date and then your return date."],["Valitse päivät","Choose dates"],
  ["Mikä on budjettisi?","What's your budget?"],["Aseta enimmäisbudjettisi.","Set your maximum budget."],
  ["Millainen sää?","What kind of weather?"],["Aurinkoinen ja lämmin","Sunny and warm"],["Leuto","Mild"],["Ei väliä","No preference"],
  ["Matkaseura","Travel companions"],["Ystävät","Friends"],["Puoliso","Partner"],["Perhe","Family"],["Yksin","Alone"],
  ["Mitä haluat tehdä?","What do you want to do?"],["Valitse kaikki sopivat","Select all that apply"],["Ranta","Beach"],["Ruoka","Food"],["Kaupunki","City"],["Luonto","Nature"],["Seikkailu","Adventure"],["Lukitse toiveeni","Lock in my preferences"],
  ["MEISTÄ","ABOUT US"],["Mikä on ","What is "],["YRITYSANALYYSI","BUSINESS ANALYSIS"],["LIIKETOIMINTASUUNNITELMA","BUSINESS PLAN"],["Meidän ","Our "],["ideamme.","idea."],
  ["Vahvuudet","Strengths"],["Heikkoudet","Weaknesses"],["Mahdollisuudet","Opportunities"],["Uhat","Threats"],
  ["Mitä myymme?","What do we sell?"],["Miten idea toimii?","How does it work?"],["Miten löydämme matkan?","How do we find the trip?"],["Mikä tekee meistä erilaisen?","What makes us different?"],
  ["YRITYKSEN TALOUS","FINANCIAL PLAN"],["Yhteenveto","Summary"],["Liikevaihto","Revenue"],["Muuttuvat kulut","Variable costs"],["Kiinteät kulut","Fixed costs"],["Kate yhteensä","Total margin"],["VOITTO / TAPPIO ILMAN TYÖNTEKIJÄÄ","PROFIT / LOSS WITHOUT EMPLOYEE"],["Yhteensä","Total"],["sähkö","electricity"],["Henkilöstö","Employee"],["vakuutukset","insurance"],["markkinointi","marketing"],["Lainakulut","Loan costs"],["Tuote 1","Product 1"],["Tuote 2","Product 2"],["Tuote 3","Product 3"],["Tuote 4","Product 4"],["Määrä","Quantity"],
  ["PALVELU","SERVICE"],["WHO IT'S FOR","KENELLE SE ON"],["WHY IT CAN SUCCEED","MIKSI SE VOI ONNISTUA"],["COMPETITIVE ADVANTAGE","KILPAILUETU"],["OUR COMPANY","YRITYKSEMME"],["CIRCULAR ECONOMY & RESPONSIBILITY","KIERTOTALOUS & VASTUULLISUUS"],["MEGATRENDS","MEGATRENDIT"],
  ["You share your ","Kerrot "],["wishes.","toiveesi."],["Niille, jotka haluavat ","For those who want to "],["matkustaa eri tavalla.","travel differently."],
  ["Miksi ","Why "],["kilpailijoista?","from competitors?"],["Rakennamme palvelua ","We build the service "],["digitaalisesti.","digitally."],
  ["Kaksi työntekijää aluksi","Two employees at first"],["Pieni tiimi etsii kohteita ja aktiviteetteja, suunnittelee matkat ja huolehtii asiakkaan kokonaisuudesta.","A small team finds destinations and activities, plans trips and takes care of the customer experience."],
  ["AI työkaluna","AI as a tool"],["Tekoälyä voidaan hyödyntää vaihtoehtojen löytämisessä, tietojen järjestämisessä ja matkakokonaisuuksien vertailussa.","AI can be used to find options, organize information and compare travel packages."],
  ["Matkan pitäisi tuntua hyvältä ","The trip should feel good "],["myös jälkeenpäin.","even afterwards."],["Matkailu muuttuu, ja me ","Travel is changing, and we "],["haluamme muuttua sen mukana.","want to change with it."],
  ["Sinä tiedät mitä haluat.","You know what you want."],["Me etsimme minne.","We find where."],["Plan your trip","Suunnittele matka"],
  ["BUSINESS ANALYSIS","YRITYSANALYYSI"],["Our idea.","Meidän ideamme."],["Financial","Talous"],["plan.","suunnitelma."],["COMPANY FINANCES","YRITYKSEN TALOUS"],
  ["Products","Tuotteet"],["Kate = myynti − muuttuvat kulut","Margin = sales − variable costs"],["Fixed costs","Kiinteät kulut"],["Yrityksen kiinteät kulut","Company fixed costs"],
  ["alla oleva","below"],["Alla oleva laskelma esittää tuotteiden katteet, muuttuvat kulut, kiinteät kulut sekä yrityksen liikevaihdon ja voiton. Luvut on pidetty samoina kuin alkuperäisessä laskelmassa.","The calculation below shows product margins, variable costs, fixed costs, company revenue and profit. The figures are the same as in the original calculation."],
  ["Kohteet on jaettu Euroopan ja muiden alueiden matkailualueisiin.","Destinations are divided into travel regions in Europe and other parts of the world."],
  ["NoClue valitsee yllätysmatkan tästä kohdevalikoimasta.","NoClue chooses a surprise trip from this destination selection."],
  ["Etelä-Eurooppa","Southern Europe"],["Länsi-Eurooppa","Western Europe"],["Keski-Eurooppa","Central Europe"],["Pohjois-Eurooppa","Northern Europe"],["Itä-Aasia","East Asia"],["Kaakkois-Aasia","Southeast Asia"],["Pohjois-Amerikka","North America"],["Oseania","Oceania"],["Etelä-Amerikka","South America"],
  ["Täytä wishes. Päivämäärät ja budjetti ovat matkan lähtökohta.","Fill in your wishes. Dates and budget are the starting point for the trip."],
  ["© 2026 NoClue Abroad","© 2026 NoClue Abroad"],
  ["Strengths — Vahvuudet","Strengths — Strengths"],["Weaknesses — Heikkoudet","Weaknesses — Weaknesses"],["Opportunities — Mahdollisuudet","Opportunities — Opportunities"],["Threats — Uhat","Threats — Threats"],
  ["The SWOT analysis avulla tarkastellaan NoClue Abroadin vahvuuksia, heikkouksia, mahdollisuuksia ja uhkia sekä niitä tekijöitä, jotka voivat vaikuttaa yrityksen toimintaan ja kasvuun.","The SWOT analysis examines NoClue Abroad's strengths, weaknesses, opportunities and threats, as well as factors that may affect the company's operations and growth."],
  ["Our yrityksessämme näkyvät erityisesti kestävä kehitys, digitalisaatio ja muuttuvat kulutustottumukset.","Our company is particularly shaped by sustainable development, digitalization and changing consumer habits."]
];
const ATTRS_TO_TRANSLATE=["aria-label","title","alt","placeholder"];
// Translate all visible text nodes, including longer paragraphs and captions.
// Finnish source text is never overwritten in the files; the current language is only rendered in the browser.
const ENGLISH_ONLY = new Set(LANGUAGE_PAIRS.map(x=>x[1]));
function translateString(value,lang){
  if(!value)return value;
  const pairs=LANGUAGE_PAIRS.slice().sort((a,b)=>Math.max(a[0].length,a[1].length)-Math.max(b[0].length,b[1].length)).reverse();
  let out=value;
  for(const [fi,en] of pairs){
    const from=lang==="en"?fi:en;
    const to=lang==="en"?en:fi;
    if(from) out=out.split(from).join(to);
  }
  return out;
}
function translateNodeTree(root,lang){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
    const n=walker.currentNode;
    if(n.parentElement?.closest(".lang-switch,script,style")) continue;
    n.textContent=translateString(n.textContent,lang);
  }
  if(root.querySelectorAll){
    root.querySelectorAll(ATTRS_TO_TRANSLATE.map(a=>"["+a+"]").join(",")).forEach(el=>{
      ATTRS_TO_TRANSLATE.forEach(a=>{if(el.hasAttribute(a))el.setAttribute(a,translateString(el.getAttribute(a),lang));});
    });
  }
}
function applyLanguage(lang){
  translateNodeTree(document.body,lang);
  document.documentElement.lang=lang;
  document.title=translateString(document.title,lang);
  localStorage.setItem("noclueLanguage",lang);
  const b=document.querySelector(".lang-switch");
  if(b)b.textContent=lang==="en"?"🇫🇮 FI":"🇬🇧 EN";
}
function setupLanguageSwitch(){
  const nav=document.querySelector(".nav");
  if(!nav||document.querySelector(".lang-switch"))return;
  const b=document.createElement("button");
  b.className="lang-switch";b.type="button";b.setAttribute("aria-label","Vaihda kieltä / Change language");
  b.addEventListener("click",()=>applyLanguage(document.documentElement.lang==="en"?"fi":"en"));
  const style=document.createElement("style");
  style.textContent=".lang-switch{border:1px solid #d9dcd6;background:#fff;color:#17231f;border-radius:999px;padding:10px 13px;font:700 12px 'DM Sans',sans-serif;cursor:pointer;transition:.2s;white-space:nowrap}.lang-switch:hover{transform:translateY(-2px);box-shadow:0 8px 20px #17231f18}.nav{gap:14px}@media(max-width:800px){.lang-switch{padding:9px 11px}}";
  document.head.appendChild(style);nav.appendChild(b);
  const saved=localStorage.getItem("noclueLanguage")||"fi";
  b.textContent=saved==="en"?"🇫🇮 FI":"🇬🇧 EN";
  document.documentElement.lang=saved;
  if(saved==="fi")translateNodeTree(document.body,"fi");
  else translateNodeTree(document.body,"en");
  const observer=new MutationObserver(muts=>{for(const m of muts){m.addedNodes.forEach(n=>{if(n.nodeType===1||n.nodeType===3)translateNodeTree(n,document.documentElement.lang);});}});
  observer.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setupLanguageSwitch);else setupLanguageSwitch();
