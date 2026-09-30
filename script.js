const form=document.getElementById('tripForm');const result=document.getElementById('result');
const DESTINATIONS=[["Barcelona","Espanja",["warm","beach","food","city"]],["Malaga","Espanja",["warm","beach","food","city"]],["Valencia","Espanja",["warm","beach","food","city"]],["Mallorca","Espanja",["warm","beach","nature","golf"]],["Rooma","Italia",["warm","food","city"]],["Bologna","Italia",["food","city"]],["Firenze","Italia",["food","city"]],["Sardinia","Italia",["warm","beach","nature"]],["Sisilia","Italia",["warm","beach","food","nature"]],["Ateena","Kreikka",["warm","food","city"]],["Kreeta","Kreikka",["warm","beach","nature"]],["Rodos","Kreikka",["warm","beach","golf"]],["Korfu","Kreikka",["warm","beach","nature"]],["Mykonos","Kreikka",["warm","beach","city"]],["Lissabon","Portugali",["warm","food","city"]],["Porto","Portugali",["food","city"]],["Algarve","Portugali",["warm","beach","golf","nature"]],["Berliini","Saksa",["city","food"]],["Hampuri","Saksa",["city","food"]],["München","Saksa",["city","nature"]],["Amsterdam","Alankomaat",["city","food"]],["Wien","Itävalta",["city","food"]],["Zürich","Sveitsi",["city","nature"]],["Geneve","Sveitsi",["city","nature"]],["Praha","Tšekki",["city","food"]],["Luxembourg","Luxemburg",["city","nature"]],["Alppikylät","Sveitsi",["nature","adventure"]],["Reykjavík","Islanti",["nature","adventure","city"]],["Oslo","Norja",["nature","city"]],["Bergen","Norja",["nature","adventure"]],["Kööpenhamina","Tanska",["city","food"]],["Tukholma","Ruotsi",["city","food"]],["Göteborg","Ruotsi",["city","food"]],["Helsinki","Suomi",["city","food"]],["Turku","Suomi",["city","food"]],["Dublin","Irlanti",["city","food"]],["Lontoo","Iso-Britannia",["city","food"]],["Pariisi","Ranska",["city","food"]],["Nizza","Ranska",["warm","beach","food","city"]],["Bordeaux","Ranska",["food","city"]],["Brugge","Belgia",["city","food"]],["Rotterdam","Alankomaat",["city","food"]],["New York","Yhdysvallat",["city","food"]],["Los Angeles","Yhdysvallat",["warm","beach","city"]],["Dallas","Yhdysvallat",["city","food"]],["Alaska","Yhdysvallat",["nature","adventure"]],["Toronto","Kanada",["city","nature"]],["Miami","Yhdysvallat",["warm","beach","city"]],["Buenos Aires","Argentiina",["warm","food","city"]],["Rio de Janeiro","Brasilia",["warm","beach","city","adventure"]],["Sapporo","Japani",["nature","food","adventure"]],["Tokio","Japani",["city","food"]],["Seoul","Etelä-Korea",["city","food"]],["Singapore","Singapore",["warm","food","city"]],["Sydney","Australia",["warm","beach","city"]],["Auckland","Uusi-Seelanti",["nature","adventure","city"]],["Wellington","Uusi-Seelanti",["nature","city"]]];
const selectedFeatured = new Set();
const FEATURED_DESTINATIONS = ['Barcelona','Mallorca','Rooma','Ateena','Lisbon','Amsterdam','Pariisi','New York','Tokio','Sydney'];
const destinationGrid = document.getElementById('allDestinationGrid');
const selectionStatus = document.getElementById('selectionStatus');
const DESTINATION_IMAGE_QUERIES={"Barcelona":"Barcelona Sagrada Familia skyline","Malaga":"Malaga Alcazaba sea view","Valencia":"Valencia City of Arts and Sciences","Mallorca":"Mallorca Cap de Formentor","Rooma":"Rome Colosseum sunset","Bologna":"Bologna skyline red rooftops","Firenze":"Florence Duomo panorama","Sardinia":"Sardinia La Pelosa beach","Sisilia":"Sicily Taormina Mount Etna sea","Ateena":"Athens Acropolis sunset","Kreeta":"Crete Balos beach","Rodos":"Rhodes Lindos beach","Korfu":"Corfu Paleokastritsa bay","Mykonos":"Mykonos Little Venice sea","Lissabon":"Lisbon viewpoint sunset","Porto":"Porto Douro Dom Luis bridge sunset","Algarve":"Algarve Benagil cave beach","Berliini":"Berlin Brandenburg Gate sunset","Hampuri":"Hamburg harbor Elbphilharmonie sunset","München":"Bavaria Neuschwanstein Castle Alps","Amsterdam":"Amsterdam canals sunset","Wien":"Vienna Schonbrunn Palace gardens","Zürich":"Zurich lake Alps panorama","Geneve":"Geneva lake Jet d'Eau Alps","Praha":"Prague Charles Bridge sunset","Luxembourg":"Luxembourg city valley panorama","Alppikylät":"Matterhorn Zermatt Alps","Reykjavík":"Iceland Reykjavik mountains ocean","Oslo":"Oslo fjord Opera House sunset","Bergen":"Bergen Norway fjord viewpoint","Kööpenhamina":"Copenhagen Nyhavn sunset","Tukholma":"Stockholm archipelago sunset","Göteborg":"Gothenburg Sweden harbor sunset","Helsinki":"Helsinki Suomenlinna sea sunset","Turku":"Turku Finland archipelago castle","Dublin":"Dublin Cliffs of Moher Ireland","Lontoo":"London Tower Bridge Thames sunset","Pariisi":"Paris Eiffel Tower sunset","Nizza":"Nice France Promenade des Anglais Mediterranean","Bordeaux":"Bordeaux Place de la Bourse water mirror","Brugge":"Bruges Belgium canals sunset","Rotterdam":"Rotterdam Erasmus Bridge skyline sunset","New York":"New York skyline Statue of Liberty sunset","Los Angeles":"Los Angeles Griffith Observatory skyline sunset","Dallas":"Dallas skyline sunset Reunion Tower","Alaska":"Alaska mountains glacier landscape","Toronto":"Toronto skyline Lake Ontario sunset","Miami":"Miami South Beach ocean sunset","Buenos Aires":"Buenos Aires skyline sunset Puerto Madero","Rio de Janeiro":"Rio de Janeiro Copacabana Sugarloaf sunset","Sapporo":"Sapporo Japan mountain city view","Tokio":"Tokyo skyline Mount Fuji sunset","Seoul":"Seoul skyline Namsan sunset","Singapore":"Singapore Marina Bay Gardens by the Bay night","Sydney":"Sydney Opera House Harbour sunset","Auckland":"Auckland New Zealand skyline harbor sunset","Wellington":"Wellington New Zealand harbor hills sunset"};
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
  result.innerHTML=`<div style="font-size:11px;letter-spacing:.15em;text-transform:uppercase;opacity:.7">NOCLUE TEKOÄLY — KOHDEVALINTA</div><h3 style="margin:8px 0;font-family:Manrope;font-size:28px">${destination.city}, ${destination.country} ✦</h3><p style="margin:0;line-height:1.6">Kohde valittiin toiveidesi perusteella. Se sopii erityisesti: ${destination.tags.filter(t=>['warm','beach','golf','food','city','nature','adventure'].includes(t)).slice(0,4).map(t=>({warm:'aurinkoiseen säähän',beach:'rantalomaan',golf:'golfiin',food:'ruokaan',city:'kaupunkilomaan',nature:'luontoon',adventure:'seikkailuun'}[t])).join(', ')}.<br><br><strong>🤫 Oikeassa NoClue-matkassa kohde pysyy matkustajalle salaisena.</strong></p><small style="display:block;margin-top:14px;opacity:.65">Valinta tehdään NoClue-kohdevalikoimasta. Tuotantoversiossa mukaan voidaan liittää myös ajantasainen lento-, hotelli- ja hintadata.</small>`;
  result.scrollIntoView({behavior:'smooth',block:'center'});
})}

const observer=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.step-card,.about-grid>div,.competitor-row>div,.destination-group').forEach(el=>{el.classList.add('reveal');observer.observe(el)});


/* Docs-style editor: shared Supabase text editing. */
(function setupDocsEditor(){
  const EDITABLE="main h1,main h2,main h3,main h4,main p,main li,main .business-kicker,main .swot-kicker,main .feedback-kicker,main .business-note";
  const SUPABASE_URL="https://moomdysipkemgecakipl.supabase.co";
  const SUPABASE_KEY="sb_publishable_O6x-K3ylIVUqn2yDBNBKLA_pzpFfO4e";
  const page=(location.pathname.split("/").pop()||"index").replace(/[^a-z0-9_-]/gi,"_");
  let editing=false;
  const api=SUPABASE_URL+"/rest/v1/site_edits";
  const headers={"apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY,"Content-Type":"application/json","Prefer":"return=minimal"};

  function elements(){return [...document.querySelectorAll(EDITABLE)];}
  function elementKey(el){let key=el.dataset.nocluEditKey;if(!key){key=String(elements().indexOf(el));el.dataset.nocluEditKey=key;}return key;}
  function setStatus(t){const st=document.querySelector(".noclue-edit-status");if(st){st.textContent=t;clearTimeout(st._t);if(t==="Tallennettu ✓")st._t=setTimeout(()=>st.textContent="",1800);}}
  async function restore(){
    try{
      const lang=document.documentElement.lang||"fi";
      const res=await fetch(api+"?page_key=eq."+encodeURIComponent(page)+"&lang=eq."+encodeURIComponent(lang)+"&select=element_key,html",{headers});
      if(!res.ok) throw new Error("Lataus epäonnistui");
      const rows=await res.json();
      const map=new Map(rows.map(r=>[String(r.element_key),r.html]));
      elements().forEach(el=>{const v=map.get(elementKey(el));if(v!==undefined)el.innerHTML=v;});
    }catch(e){setStatus("Yhteysvirhe");console.error(e);}
  }
  function toggle(on){
    editing=on;document.body.classList.toggle("noclue-editing",on);
    elements().forEach(el=>{el.contentEditable=on?"true":"false";el.classList.toggle("noclue-editable",on);});
    const e=document.querySelector(".noclue-edit-btn"),s=document.querySelector(".noclue-save-btn"),r=document.querySelector(".noclue-reset-btn");
    if(e)e.textContent=on?"Lopeta muokkaus":"Muokkaa";if(s)s.hidden=!on;if(r)r.hidden=!on;
  }
  async function save(){
    try{
      const lang=document.documentElement.lang||"fi";
      const rows=elements().map(el=>({page_key:page,lang,element_key:elementKey(el),html:el.innerHTML,updated_at:new Date().toISOString()}));
      const res=await fetch(api,{method:"POST",headers:{...headers,"Prefer":"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(rows)});
      if(!res.ok) throw new Error(await res.text());
      setStatus("Tallennettu ✓");
    }catch(e){setStatus("Tallennus epäonnistui");console.error(e);}
  }
  async function reset(){
    if(!confirm("Palautetaanko tämän sivun alkuperäiset tekstit?"))return;
    try{
      const lang=document.documentElement.lang||"fi";
      const res=await fetch(api+"?page_key=eq."+encodeURIComponent(page)+"&lang=eq."+encodeURIComponent(lang),{method:"DELETE",headers});
      if(!res.ok)throw new Error(await res.text());
      location.reload();
    }catch(e){setStatus("Palautus epäonnistui");console.error(e);}
  }
  function init(){
    if(document.querySelector(".noclue-editor-bar"))return;
    const bar=document.createElement("div");bar.className="noclue-editor-bar";
    bar.innerHTML='<button class="noclue-edit-btn" type="button">Muokkaa</button><button class="noclue-save-btn" type="button" hidden>Tallenna</button><button class="noclue-reset-btn" type="button" hidden>Palauta</button><span class="noclue-edit-status"></span>';
    document.body.appendChild(bar);
    bar.querySelector(".noclue-edit-btn").onclick=()=>toggle(!editing);
    bar.querySelector(".noclue-save-btn").onclick=save;
    bar.querySelector(".noclue-reset-btn").onclick=reset;
    restore();
  }
  const css=document.createElement("style");css.textContent=`
    .noclue-editor-bar{position:fixed;right:22px;bottom:22px;z-index:9999;display:flex;gap:8px;align-items:center;padding:8px;background:rgba(255,253,248,.96);border:1px solid #d3c1a8;border-radius:16px;box-shadow:0 12px 35px rgba(47,41,35,.14);backdrop-filter:blur(10px);font:600 13px "DM Sans",sans-serif}
    .noclue-editor-bar button{border:0;border-radius:10px;padding:9px 13px;background:#17231f;color:#fff;cursor:pointer}
    .noclue-editor-bar .noclue-save-btn{background:#9a6240}.noclue-editor-bar .noclue-reset-btn{background:#eee7dc;color:#17231f}.noclue-edit-status{min-width:70px;text-align:center;color:#6b6259}
    .noclue-editing .noclue-editable{outline:1px dashed rgba(154,98,64,.55);outline-offset:5px;cursor:text}.noclue-editing .noclue-editable:focus{outline:2px solid #9a6240;background:rgba(255,253,248,.72)}
    @media(max-width:700px){.noclue-editor-bar{left:10px;right:10px;bottom:10px;justify-content:center}.noclue-editor-bar button{padding:8px 10px}}
  `;document.head.appendChild(css);
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();