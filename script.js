const form=document.getElementById('tripForm');const result=document.getElementById('result');

const DESTINATIONS=[
{city:'Barcelona',country:'Espanja',region:'Espanja',tags:['warm','beach','city','food','golf']},
{city:'Malaga',country:'Espanja',region:'Espanja',tags:['warm','beach','city','food','golf','nature']},
{city:'Valencia',country:'Espanja',region:'Espanja',tags:['warm','beach','city','food']},
{city:'Mallorca',country:'Espanja',region:'Espanja',tags:['warm','beach','food','golf','nature','adventure']},
{city:'Rooma',country:'Italia',region:'Italia',tags:['city','food','culture']},
{city:'Bologna',country:'Italia',region:'Italia',tags:['city','food','culture']},
{city:'Florence',country:'Italia',region:'Italia',tags:['city','food','culture']},
{city:'Sardinia',country:'Italia',region:'Italia',tags:['warm','beach','nature','adventure','golf']},
{city:'Sisilia',country:'Italia',region:'Italia',tags:['warm','beach','food','nature','culture']},
{city:'Ateena',country:'Kreikka',region:'Kreikka',tags:['warm','city','food','culture']},
{city:'Kreeta',country:'Kreikka',region:'Kreikka',tags:['warm','beach','food','nature','adventure','golf']},
{city:'Rodos',country:'Kreikka',region:'Kreikka',tags:['warm','beach','food','golf']},
{city:'Korfu',country:'Kreikka',region:'Kreikka',tags:['warm','beach','nature','food']},
{city:'Mykonos',country:'Kreikka',region:'Kreikka',tags:['warm','beach','food','city']},
{city:'Lisbon',country:'Portugali',region:'Portugali',tags:['warm','city','food','beach','golf']},
{city:'Porto',country:'Portugali',region:'Portugali',tags:['city','food','culture']},
{city:'Algarve',country:'Portugali',region:'Portugali',tags:['warm','beach','golf','nature']},
{city:'Berliini',country:'Saksa',region:'Keski-Eurooppa',tags:['city','food','culture']},
{city:'Hampuri',country:'Saksa',region:'Keski-Eurooppa',tags:['city','food']},
{city:'München',country:'Saksa',region:'Keski-Eurooppa',tags:['city','food','nature','adventure']},
{city:'Amsterdam',country:'Alankomaat',region:'Keski-Eurooppa',tags:['city','food','culture']},
{city:'Vienna',country:'Itävalta',region:'Keski-Eurooppa',tags:['city','food','culture']},
{city:'Zürich',country:'Sveitsi',region:'Keski-Eurooppa',tags:['city','nature','food']},
{city:'Geneva',country:'Sveitsi',region:'Keski-Eurooppa',tags:['city','nature','food']},
{city:'Praha',country:'Tšekki',region:'Keski-Eurooppa',tags:['city','food','culture']},
{city:'Luxembourg',country:'Luxemburg',region:'Keski-Eurooppa',tags:['city','nature','culture']},
{city:'Alppikylät',country:'Alppialue',region:'Keski-Eurooppa',tags:['nature','adventure','golf']},
{city:'Reykjavik',country:'Islanti',region:'Pohjois-Eurooppa',tags:['nature','adventure','city']},
{city:'Oslo',country:'Norja',region:'Pohjois-Eurooppa',tags:['city','nature','adventure']},
{city:'Bergen',country:'Norja',region:'Pohjois-Eurooppa',tags:['nature','adventure','city']},
{city:'Kööpenhamina',country:'Tanska',region:'Pohjois-Eurooppa',tags:['city','food','culture']},
{city:'Tukholma',country:'Ruotsi',region:'Pohjois-Eurooppa',tags:['city','food','culture']},
{city:'Gothenburg',country:'Ruotsi',region:'Pohjois-Eurooppa',tags:['city','food','nature']},
{city:'Helsinki',country:'Suomi',region:'Pohjois-Eurooppa',tags:['city','food','culture','nature']},
{city:'Turku',country:'Suomi',region:'Pohjois-Eurooppa',tags:['city','food','culture']},
{city:'Dublin',country:'Irlanti',region:'Länsi-Eurooppa',tags:['city','food','culture']},
{city:'Lontoo',country:'Iso-Britannia',region:'Länsi-Eurooppa',tags:['city','food','culture']},
{city:'Pariisi',country:'Ranska',region:'Länsi-Eurooppa',tags:['city','food','culture']},
{city:'Nizza',country:'Ranska',region:'Länsi-Eurooppa',tags:['warm','beach','city','food']},
{city:'Bordeaux',country:'Ranska',region:'Länsi-Eurooppa',tags:['food','city','culture']},
{city:'Bruges',country:'Belgia',region:'Länsi-Eurooppa',tags:['city','food','culture']},
{city:'Amsterdam',country:'Alankomaat',region:'Länsi-Eurooppa',tags:['city','food','culture']},
{city:'Rotterdam',country:'Alankomaat',region:'Länsi-Eurooppa',tags:['city','food','culture']},
{city:'New York',country:'Yhdysvallat',region:'Amerikat',tags:['city','food','culture']},
{city:'Los Angeles',country:'Yhdysvallat',region:'Amerikat',tags:['warm','beach','city','food']},
{city:'Dallas',country:'Yhdysvallat',region:'Amerikat',tags:['warm','city','food']},
{city:'Alaska',country:'Yhdysvallat',region:'Amerikat',tags:['nature','adventure']},
{city:'Toronto',country:'Kanada',region:'Amerikat',tags:['city','food','nature']},
{city:'Miami',country:'Yhdysvallat',region:'Amerikat',tags:['warm','beach','city','food','golf']},
{city:'Buenos Aires',country:'Argentiina',region:'Amerikat',tags:['city','food','culture']},
{city:'Rio de Janeiro',country:'Brasilia',region:'Amerikat',tags:['warm','beach','city','nature','adventure']},
{city:'Sapporo',country:'Japani',region:'Kauko-Itä',tags:['city','food','nature','adventure']},
{city:'Tokio',country:'Japani',region:'Kauko-Itä',tags:['city','food','culture']},
{city:'Seoul',country:'Etelä-Korea',region:'Kauko-Itä',tags:['city','food','culture']},
{city:'Singapore',country:'Singapore',region:'Kauko-Itä',tags:['warm','city','food','culture']},
{city:'Sydney',country:'Australia',region:'Kauko-Itä',tags:['warm','beach','city','nature']},
{city:'Auckland',country:'Uusi-Seelanti',region:'Kauko-Itä',tags:['nature','adventure','city']},
{city:'Wellington',country:'Uusi-Seelanti',region:'Kauko-Itä',tags:['nature','adventure','city']}
];

function scoreDestination(d,data){
  let score=1;
  const warm=data.weather.includes('Aurinkoinen');
  const interests=data.interests;
  if(warm&&d.tags.includes('warm'))score+=7;
  if(warm&&!d.tags.includes('warm'))score-=1;
  if(interests.includes('Ranta')&&d.tags.includes('beach'))score+=8;
  if(interests.includes('Golf')&&d.tags.includes('golf'))score+=8;
  if(interests.includes('Ruoka')&&d.tags.includes('food'))score+=5;
  if(interests.includes('Kaupunki')&&d.tags.includes('city'))score+=6;
  if(interests.includes('Luonto')&&d.tags.includes('nature'))score+=7;
  if(interests.includes('Seikkailu')&&d.tags.includes('adventure'))score+=7;
  return score;
}

function pickDestination(data){
  const scored=DESTINATIONS.map(d=>({...d,score:scoreDestination(d,data)}));
  const max=Math.max(...scored.map(d=>d.score));
  const best=scored.filter(d=>d.score===max);
  return best[Math.floor(Math.random()*best.length)];
}

if(form){form.addEventListener('submit',e=>{
  e.preventDefault();
  const data={
    budget:document.getElementById('budget').value,
    duration:document.getElementById('duration')?.value||'',
    weather:document.getElementById('weather').value,
    company:document.getElementById('company').value,
    interests:[...document.querySelectorAll('.chips input:checked')].map(x=>x.value)
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
'🇫🇮':'🇬🇧',
'Uusi tapa matkustaa':'A new way to travel','Miten se toimii':'How it works','Meistä':'About us','Aloita':'Get started','Suunnittele matka':'Plan your trip','Tiedät mitä haluat.':'You know what you want.','Et tiedä minne olet menossa.':'You do not know where you are going.','Kerro meille millaisen matkan haluat. Me hoidamme kohteen. Sinä saat yllätyksen.':'Tell us what kind of trip you want. We choose the destination. You get the surprise.','Suunnittele yllätysmatka':'Plan a surprise trip','Katso miten se toimii':'See how it works','LÄHTÖ':'DEPARTURE','KOHDE':'DESTINATION','Salainen':'Secret','Selviää myöhemmin':'Revealed later','Helsinki':'Helsinki','Näin se toimii':'How it works','Sinä päätät ':'You choose the ','fiiliksen.':'vibe.','Me päätämme paikan.':'We choose the place.','Ei tuntikausien hotellien selaamista. Ei kymmeniä välilehtiä. Kerro tärkeimmät toiveesi ja anna meidän rakentaa niistä matka.':'No hours of browsing hotels. No dozens of tabs. Tell us what matters and let us build the trip.','Kerro mitä haluat':'Tell us what you want','Esimerkiksi lämmin kohde, golfia, uintia, hyvää ruokaa ja budjetti 2 000 €.':'For example: a warm destination, golf, swimming, great food and a €2,000 budget.','Me valitsemme kohteen':'We choose the destination','Etsimme toiveisiisi sopivan vaihtoehdon ja pidämme kohteen salassa.':'We find an option that fits your wishes and keep the destination secret.','Sinä lähdet':'You leave','Saat pakkauslistan ja tarvittavat tiedot. Kohde selviää oikealla hetkellä.':'You get a packing list and the information you need. The destination is revealed at the right moment.','Sinun vuorosi':'Your turn','Millainen matka':'What kind of trip','sinua kiinnostaa?':'interests you?','Täytä toiveesi. Tästä alkaa NoClue-kokemus.':'Tell us your wishes. This is where the NoClue experience begins.','Budjetti':'Budget','Matkan pituus':'Trip length','Millainen sää?':'What weather?','Matkaseura':'Travel companions','Aurinkoinen ja lämmin':'Sunny and warm','Leuto':'Mild','Ei väliä':'No preference','Ystävät':'Friends','Puoliso':'Partner','Perhe':'Family','Yksin':'Alone','Mitä haluat tehdä?':'What do you want to do?','Valitse kaikki sopivat':'Select all that apply','Ranta':'Beach','Ruoka':'Food','Kaupunki':'City','Luonto':'Nature','Seikkailu':'Adventure','Lukitse toiveeni':'Lock in my wishes','MEISTÄ':'ABOUT US','Mikä on ':'What is ','NoClue Abroad on palvelu, jossa asiakas kertoo millaisen matkan hän haluaa, mutta ei tiedä etukäteen minne hän on menossa.':'NoClue Abroad is a service where you tell us what kind of trip you want without knowing where you are going in advance.','PALVELU':'SERVICE','Sinä kerrot ':'You tell us your ','toiveesi.':'wishes.','Lämmin kohde, golfia, uintia ja budjetti 2 000 €.':'A warm destination, golf, swimming and a €2,000 budget.','Kerrot ideasi':'Share your idea','Me suunnittelemme':'We plan it','Etsimme kohteen ja aktiviteetit toiveidesi perusteella.':'We find the destination and activities based on your wishes.','Sinä lähdet':'You leave','Saman tien?':'Right away?','KENELLE':'WHO IT IS FOR','Niille, jotka eivät halua ':'For people who do not want to ','suunnitella kaikkea.':'plan everything.','Palvelu sopii kiireisille ihmisille, jotka eivät halua käyttää aikaa matkan suunnitteluun, nuorille jotka haluavat enemmän jännitystä sekä ihmisille, jotka yksinkertaisesti vihaavat matkojen järjestämistä. Se sopii myös kaveriporukoille.':'The service is for busy people who do not want to spend time planning trips, young people looking for more adventure, and people who simply hate organizing travel. It also works for groups of friends.','YRITYKSEMME':'OUR COMPANY','Toimimme ':'We operate ','Suomesta.':'from Finland.','Yritys ei tarvitse aluksi omia toimitiloja, koska toimintaa voidaan hoitaa digitaalisesti. Aluksi yrityksessä on kaksi työntekijää.':'The company does not initially need its own premises because the business can be run digitally. At first, the company has two employees.','2 työntekijää':'2 employees','AI apuna':'AI support','AI auttaa kohteiden, hintojen ja aktiviteettien etsimisessä ja vertailussa.':'AI helps find and compare destinations, prices and activities.','KIERTOTALOUS & VASTUULLISUUS':'CIRCULARITY & RESPONSIBILITY','Vastuullisuus kuuluu ':'Responsibility is part of the ','matkaan.':'journey.','Haluamme huomioida ympäristövaikutukset ilman, että matkan laatu kärsii. Lyhyemmillä matkoilla voimme suosia junia ja busseja lentämisen sijaan. Suosimme mahdollisuuksien mukaan vastuullisia hotelleja, aktiviteetteja ja paikallisia yrityksiä. Liput, matkaohjeet ja pakkauslista toimitetaan digitaalisesti, jotta turhaa paperia ja materiaalia tarvitaan vähemmän.':'We want to consider environmental impact without compromising trip quality. For shorter trips, we can favor trains and buses instead of flying. Where possible, we favor responsible hotels, activities and local businesses. Tickets, travel instructions and packing lists are delivered digitally to reduce paper and materials.','MEGATRENDIT':'MEGATRENDS','Matkailu muuttuu.':'Travel is changing.','Sinä tiedät mitä haluat.':'You know what you want.','Me etsimme minne.':'We find where.','© 2026 NoClue Abroad':'© 2026 NoClue Abroad',
'Kohdevalikoima':'Destination collection','Matkasi voi viedä':'Your trip can take you','mihin tahansa näistä.':'to any of these.','Sinä kerrot millaista matkaa haluat. NoClue valitsee toiveisiisi sopivan kohteen tästä valikoimasta — mutta pitää lopullisen kohteen yllätyksenä.':'You tell us what kind of trip you want. NoClue chooses a destination from this collection — but keeps the final destination a surprise.','KOHDEVALIKOIMA':'DESTINATION COLLECTION','KOHDEVALINTA':'DESTINATION SELECTION'
};
function applyLanguage(lang){const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(walk.nextNode()){const n=walk.currentNode;if(n.parentElement.closest('.lang-switch'))continue;const original=n.textContent;let value=original;Object.keys(translations).forEach(k=>{if(lang==='en'&&value.includes(k))value=value.split(k).join(translations[k]);else if(lang==='fi'){const en=translations[k];if(en)value=value.split(en).join(k)}});n.textContent=value}document.documentElement.lang=lang;document.title=lang==='en'?'NoClue Abroad — You know what. Not where.':'NoClue Abroad — You know what. Not where.';localStorage.setItem('noclueLanguage',lang);const b=document.querySelector('.lang-switch');if(b)b.textContent=lang==='en'?'🇫🇮 FI':'🇬🇧 EN'}
function setupLanguageSwitch(){const nav=document.querySelector('.nav');if(!nav||document.querySelector('.lang-switch'))return;const b=document.createElement('button');b.className='lang-switch';b.type='button';b.setAttribute('aria-label','Change language');b.addEventListener('click',()=>applyLanguage(document.documentElement.lang==='en'?'fi':'en'));const style=document.createElement('style');style.textContent='.lang-switch{border:1px solid #d9dcd6;background:#fff;color:#17231f;border-radius:999px;padding:10px 13px;font:700 12px "DM Sans",sans-serif;cursor:pointer;transition:.2s}.lang-switch:hover{transform:translateY(-2px);box-shadow:0 8px 20px #17231f18}.nav{gap:14px}.lang-switch+*{}@media(max-width:800px){.nav nav{display:none}.lang-switch{padding:9px 11px}}';document.head.appendChild(style);nav.appendChild(b);applyLanguage(localStorage.getItem('noclueLanguage')||'fi')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupLanguageSwitch);else setupLanguageSwitch();