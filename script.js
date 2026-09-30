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



/* NoClue Abroad — clean bilingual system.
   Finnish is the source language. The selected language is stored once
   and restored automatically on every page. */
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
["BUSINESS ANALYSIS","YRITYSANALYYSI"],["SWOT-analyysissä tarkastellaan NoClue Abroadin vahvuuksia, heikkouksia, mahdollisuuksia ja uhkia sekä niitä tekijöitä, jotka voivat vaikuttaa yrityksen toimintaan ja kasvuun.","The SWOT analysis examines NoClue Abroad’s strengths, weaknesses, opportunities and threats, as well as the factors that may affect the company’s operations and growth."],["analyysi.","analysis."],
["Vahvuudet","Strengths"],["Heikkoudet","Weaknesses"],["Mahdollisuudet","Opportunities"],["Uhat","Threats"],
["PALVELU","SERVICE"],["KENELLE SE ON","WHO IT'S FOR"],["MIKSI SE VOI ONNISTUA","WHY IT CAN SUCCEED"],["KILPAILUETU","COMPETITIVE ADVANTAGE"],["YRITYKSEMME","OUR COMPANY"],["KIERTOTALOUS & VASTUULLISUUS","CIRCULAR ECONOMY & RESPONSIBILITY"],["MEGATRENDIT","MEGATRENDS"],
["Sinä kerrot ","You share your "],["toiveesi.","wishes."],["Niille, jotka haluavat ","For those who want to "],["matkustaa eri tavalla.","travel differently."],
["Miksi ","Why "],["kilpailijoista?","from competitors?"],["Rakennamme palvelua ","We build the service "],["digitaalisesti.","digitally."],["Kaksi työntekijää aluksi","Two employees at first"],["Tekoäly työkaluna","AI as a tool"],
["Matkan pitäisi tuntua hyvältä ","The trip should feel good "],["myös jälkeenpäin.","even afterwards."],["Matkailu muuttuu, ja me ","Travel is changing, and we "],["haluamme muuttua sen mukana.","want to change with it."],
["Sinä tiedät mitä haluat.","You know what you want."],["Me etsimme minne.","We find where."],
["LIIKETOIMINTASUUNNITELMA","BUSINESS PLAN"],["Meidän ","Our "],["ideamme.","idea."],["Mitä myymme?","What do we sell?"],["Miten idea toimii?","How does it work?"],["Miten löydämme matkan?","How do we find the trip?"],["Mikä tekee meistä erilaisen?","What makes us different?"],
["YRITYKSEN TALOUS","COMPANY FINANCES"],["Talous","Financial"],["laskelma.","plan."],["Tuotteet","Products"],["Kate = myynti − muuttuvat kulut","Margin = sales − variable costs"],["Yrityksen kiinteät kulut","Company fixed costs"],["Yhteensä","Total"],["Määrä","Quantity"],["Yhteenveto","Summary"],["Liikevaihto","Revenue"],["Muuttuvat kulut","Variable costs"],["Kiinteät kulut","Fixed costs"],["Kate yhteensä","Total margin"],["VOITTO / TAPPIO ILMAN TYÖNTEKIJÄÄ","PROFIT / LOSS WITHOUT EMPLOYEE"],["sähkö","electricity"],["Henkilöstö","Employees"],["vakuutukset","insurance"],["markkinointi","marketing"],["Lainakulut","Loan costs"],
["Tuote 1 kate","Product 1 margin"],["Tuote 2 kate","Product 2 margin"],["Tuote 3 kate","Product 3 margin"],["Tuote 4 kate","Product 4 margin"],
["NoClue Abroad myy uudenlaista tapaa matkustaa. Asiakas kertoo meille, millaisen matkan hän haluaa, mutta ei päätä itse kohdetta. Me etsimme matkaan sopivan kohteen ja tekemisen.","NoClue Abroad sells a new way to travel. The customer tells us what kind of trip they want, but does not choose the destination themselves. We find a suitable destination and activities for the trip."],
["Myymme palvelua, jossa ostaja saa antaa ideoita omasta matkastaan. Hän voi esimerkiksi kertoa, että haluaa lämpimään kohteeseen, haluaa golfata ja uida sekä käyttää matkalle 2 000 €.","We sell a service where the customer can give ideas for their trip. For example, they can say they want a warm destination, golf and swimming, and want to spend €2,000 on the trip."],
["Idea perustuu yllätykseen. Asiakas ei tiedä etukäteen, minne hän on menossa. Ennen matkaa hän saa pakkauslistan, josta selviää mitä kannattaa ottaa mukaan. Kohde kerrotaan vasta lentokentällä ja matkan tarkempi ohjelma selviää vasta kohteessa.","The idea is based on surprise. The customer does not know in advance where they are going. Before the trip, they receive a packing list showing what to bring. The destination is revealed at the airport and the detailed itinerary is revealed at the destination."],
["Kun tiedämme asiakkaan toiveet, alamme etsiä niihin sopivia matkakohteita, lentoja ja aktiviteetteja. Hyödynnämme tekoälyä apuna, jotta voimme verrata vaihtoehtoja ja etsiä hyvää hintalaatusuhdetta.","Once we know the customer's wishes, we look for suitable destinations, flights and activities. We use AI to compare options and look for good value for money."],
["Olemme ensimmäinen tällainen yllätysmatkailupalvelu, joka lähtee Pohjoismaista. Tavoitteena on tehdä matkalle lähtemisestä helppoa ja samalla jännittävää. Asiakas saa itse päättää matkan tärkeimmät toiveet, mutta jättää kohteen ja tekemisen meidän vastuullemme.","We are the first surprise travel service of this kind operating from the Nordic countries. Our goal is to make travelling easy while keeping it exciting. The customer decides the most important wishes for the trip, while leaving the destination and activities to us."],
["Olemme ainoa kaltaisemme firma, joka toimii Pohjois-Euroopassa. Koska olemme nuoria, annamme matkaasi nuorekkaan näkemyksen. Kohteemme ovat tarkkaan valittuja turvallisuuden ja ympäristöystävällisyyden perusteella.","We are the only company of our kind operating in Northern Europe. Because we are young, we bring a youthful perspective to your trip. Our destinations are carefully selected based on safety and environmental friendliness."],
["Olemme uusi ja nuori yritys, joten meillä ei vielä ole samanlaista kokemusta alalta kuin vanhemmilla yrityksillä. Myös asiakaskunnan ja tunnettuuden rakentaminen vie aikaa.","We are a new and young company, so we do not yet have the same industry experience as older companies. Building a customer base and brand awareness also takes time."],
["Olemme ainoa Pohjoismaissa toimiva kaltaisemme firma. Tämä antaa meille mahdollisuuden erottua muista ja tarjota asiakkaille jotain erilaista. Pohjoismaissa toimiminen auttaa myös ymmärtämään paremmin alueen asiakkaita ja heidän tarpeitaan.","We are the only company of our kind operating in the Nordic countries. This gives us an opportunity to stand out and offer customers something different. Operating in the Nordic countries also helps us understand local customers and their needs better."],
["Pohjoismaissa on kohtalaisen pieni määrä potentiaalisia asiakkaita verrattuna muihin maailmanosiin. Asiakkaiden määrä voi rajoittaa yrityksen kasvua, jos toiminta pysyy pelkästään Pohjoismaissa. Tulevaisuudessa toimintaa voisi olla mahdollista laajentaa myös muualle.","The Nordic countries have a relatively small number of potential customers compared with other parts of the world. The number of customers could limit the company's growth if operations remain only in the Nordic countries. In the future, it may be possible to expand elsewhere as well."],
["Alla oleva laskelma esittää tuotteiden katteet, muuttuvat kulut, kiinteät kulut sekä yrityksen liikevaihdon ja voiton. Luvut on pidetty samoina kuin alkuperäisessä laskelmassa.","The calculation below shows product margins, variable costs, fixed costs, company revenue and profit. The figures are the same as in the original calculation."],
["Matkan suunnittelu alkaa asioista, jotka ovat sinulle oikeasti tärkeitä. Voit kertoa esimerkiksi haluavasi lämpöä, hyvää ruokaa, uintia ja golfia sekä asettaa matkalle tietyn budjetin ja ajankohdan. Sen sijaan että joutuisit vertailemaan itse kymmeniä kohteita, hotelleja ja aktiviteetteja, NoClue Abroad kokoaa näistä lähtökohdista kokonaisuuden, joka sopii juuri kyseiseen matkaan. Tarkoituksena ei ole päättää kaikkea puolestasi, vaan poistaa turha suunnittelutyö ja jättää tilaa itse kokemukselle.","Trip planning starts with the things that really matter to you. You can tell us, for example, that you want warmth, good food, swimming and golf, and set a budget and travel dates. Instead of comparing dozens of destinations, hotels and activities yourself, NoClue Abroad builds a trip around these starting points. The goal is not to decide everything for you, but to remove unnecessary planning and leave room for the experience itself."],
["Niille, jotka haluavat matkustaa eri tavalla.","For those who want to travel differently."],
["NoClue Abroad on suunniteltu ihmisille, joille matkustamisen idea kiinnostaa enemmän kuin tuntikausien suunnittelu. Se voi tarkoittaa kiireistä ihmistä, jolla ei ole aikaa vertailla vaihtoehtoja, kaveriporukkaa joka haluaa tehdä yhdessä jotain erilaista tai matkailijaa, joka on jo nähnyt tavalliset lomat ja kaipaa seuraavalta reissulta enemmän yllätyksellisyyttä. Palvelun tarkoitus on tehdä päätöksenteosta kevyempää ja samalla antaa matkalle oma tarinansa jo ennen lähtöä.","NoClue Abroad is designed for people who are more interested in the idea of travelling than in hours of planning. This could be a busy person who has no time to compare options, a group of friends who want to do something different together, or a traveller who has already experienced ordinary holidays and wants more surprise from the next trip. The service makes decision-making easier while giving the trip its own story before departure."],
["Tuotteen menestys perustuu siihen, että nuorilla on intohimo seikkailla ja tutustua maailmaan, mutta he eivät aina tiedä, minne haluaisivat mennä. Myös vanhemmilta ihmisiltä saattaa puuttua arjesta jännitystä, ja me haluamme tuoda sitä heidän elämäänsä. Tällaisia firmoja ei ole Skandinavian maissa samalla tavalla, joten haluamme tuoda uudenlaisen tavan matkustaa Pohjoismaihin. Tavoitteena on, että jokainen skandinaavinen asiakas voi luottaa siihen, että toteutamme hänen unelmamatkansa luotettavasti ja asiallisesti.","The product can succeed because young people are passionate about adventure and exploring the world, but they do not always know where they want to go. Older people may also lack excitement in everyday life, and we want to bring some of it into their lives. There are not many companies like this in Scandinavia, so we want to bring a new way of travelling to the Nordic countries. The goal is for every Scandinavian customer to be able to trust us to deliver their dream trip reliably and professionally."],
["Tarjoamme matkalle nuorekkaan näkemyksen ja haluamme olla ensimmäinen pohjoismainen mysteerimatkojen tarjoaja. Valitsemme matkan ennen kaikkea kokemusten ja aktiviteettien perusteella, emmekä vain sen perusteella, mikä kohde näyttää hyvältä. Lisäksi tarjoamme matkoja pohjoismaisista lähtöpisteistä, esimerkiksi Suomesta ja Ruotsista.","We bring a youthful perspective to travel and want to be the first Nordic mystery travel provider. We choose trips primarily based on experiences and activities, not just on how good a destination looks. We also offer trips departing from Nordic starting points, such as Finland and Sweden."],
["Aluksi tarvitsemme vain kaksi työntekijää. He etsivät täydellisiä matkakohteita ja siellä tehtäviä aktiviteetteja, suunnittelevat asiakkaan matkan ja pitävät huolen siitä, että kaikki sujuu hyvin. Asiakas voi antaa matkansa tärkeimmät lähtökohdat verkossa, minkä jälkeen suunnittelussa voidaan käyttää sekä ihmisten tekemää taustatyötä että tekoälyä.","At first, we only need two employees. They find suitable destinations and activities, plan the customer's trip and make sure everything runs smoothly. The customer can provide the key details of the trip online, after which the planning can use both human research and AI."],
["Me huomioimme vastuullisuuden suosimalla ekologisempia matkustustapoja aina kun se on mahdollista. Esimerkiksi lyhyemmillä matkoilla voitaisiin suosia junia lentämisen sijaan. Myös hotelleissa ja aktiviteeteissa suosittaisiin vastuullisesti toimivia yrityksiä. Matkoissa huomioitaisiin ympäristövaikutukset, mutta samalla pidettäisiin huolta siitä, ettei se näy matkan laadussa. Yritys vähentäisi myös turhaa materiaalin käyttöä toimittamalla matkaohjeet, liput ja pakkauslistan digitaalisesti.","We consider responsibility by favouring more ecological ways of travelling whenever possible. For example, on shorter trips, trains could be preferred instead of flying. Hotels and activities would also favour responsibly operating companies. Environmental impacts would be considered while maintaining the quality of the trip. The company would also reduce unnecessary material use by providing travel instructions, tickets and packing lists digitally."],
["Matkailu muuttuu, ja me haluamme muuttua sen mukana.","Travel is changing, and we want to change with it."],
["Yrityksessämme näkyvät erityisesti kestävä kehitys, digitalisaatio ja muuttuvat kulutustottumukset. Ihmiset haluavat matkustaa ja saada uusia elämyksiä, mutta samalla yhä useampi haluaa tehdä sen vastuullisesti. Me tarjoamme tähän ratkaisun. Digitalisaatio näkyy siinä, että tekoälyä ja muita palveluita hyödynnetään sopivan matkan löytämiseen ja kokoamiseen.","Our company is particularly shaped by sustainable development, digitalization and changing consumer habits. People want to travel and have new experiences, while more and more people also want to do so responsibly. We offer a solution to this. Digitalization can be seen in the use of AI and other services to find and build a suitable trip."]
["Vastuullisuus","Responsibility"],
["09 — VASTUULLISUUS","09 — RESPONSIBILITY"],
["Vastuullisuus — NoClue Abroad","Responsibility — NoClue Abroad"],
["Vastuullinen matkailu on tärkeä osa NoClue Abroadin tapaa rakentaa matkoja.","Responsible travel is an important part of how NoClue Abroad builds trips."],
["NoClue Abroadissa haluamme tehdä matkailusta elämyksellistä ja vastuullista. Toteutamme tämän suosimalla paikallisia yrityksiä, ympäristöystävällisiä palveluita ja julkista liikennettä aina, kun se on mahdollista, jotta matkailusta saatava raha hyödyttää suoraan alueen asukkaita. Kunnioitamme paikallista kulttuuria, luontoa ja eläimiä. Vältämme vastuuttomia aktiviteetteja ja pyrimme vähentämään matkojen hiilijalanjälkeä, energiankulutusta sekä jätteen määrää.","At NoClue Abroad, we want to make travel experiential and responsible. We do this by favouring local businesses, environmentally friendly services and public transport whenever possible, so that money from tourism benefits local residents directly. We respect local culture, nature and animals. We avoid irresponsible activities and aim to reduce the carbon footprint, energy consumption and amount of waste caused by trips."],
["Luonto- ja kulttuuriarvojen lisäksi valitsemme kohteet asiakkaan turvallisuuden perusteella. Suosimme kohteita, joissa myös naiset ja seksuaalivähemmistöihin kuuluvat matkailijat voivat tuntea olonsa turvalliseksi ja tervetulleeksi ilman pelkoa syrjinnästä tai häirinnästä. Tukeaksemme eläinten hyvinvointia lahjoitamme lisäksi 5 % tuloistamme eläinsuojelutyöhön.","In addition to nature and cultural values, we choose destinations based on customer safety. We favour destinations where women and travellers belonging to sexual minorities can also feel safe and welcome without fear of discrimination or harassment. To support animal welfare, we also donate 5% of our income to animal protection work."],
["Haluamme varmistaa, että matkustaminen hyödyttää sekä matkailijaa että paikallista yhteisöä.","We want to ensure that travel benefits both the traveller and the local community."],
["Luonnon ja matkailun maisema","Landscape of nature and travel"],
["Luonto matkakohteessa","Nature at a travel destination"],
["Eläin luonnossa","Animal in nature"],
["Julkinen liikenne","Public transport"],
["Paikallinen matkailu","Local travel"],
["Luonto ja eläimet","Nature and animals"],

];





LANGUAGE_PAIRS.push(
["NoClue Abroad etusivu","NoClue Abroad home page"],
["Vertaispalaute","Peer feedback"],
["08 — PALAUTE","08 — FEEDBACK"],
["Vertaispalaute.","Peer feedback."],
["Ulkopuolinen palaute NoClue Abroadin ideasta ja verkkosivusta.","External feedback on the NoClue Abroad idea and website."],
["NoClue Abroadin idea on kiinnostava ja erottuva. Mysteerimatkat tekevät matkustamisesta jännittävämpää ja samalla asiakkaan ei tarvitse käyttää aikaa matkan suunnitteluun. Yrityksen toimintaperiaate on selkeä, ja verkkosivuilta saa nopeasti hyvän käsityksen palvelusta. Erityisesti asiakkaan toiveiden, budjetin ja kiinnostuksen kohteiden huomioiminen on hyvä idea. Palvelu voisi sopia erityisesti nuorille ja seikkailunhaluisille matkustajille, jotka haluavat kokea jotain uutta ilman tarkkaa ennakkosuunnittelua. Kokonaisuutena idea vaikuttaa toimivalta ja siinä on paljon potentiaalia.","The NoClue Abroad idea is interesting and distinctive. Mystery trips make travelling more exciting, while the customer does not have to spend time planning the trip. The company’s operating principle is clear, and the website gives a quick and clear understanding of the service. In particular, taking the customer’s wishes, budget and interests into account is a good idea. The service could be especially suitable for young and adventurous travellers who want to experience something new without detailed advance planning. Overall, the idea seems functional and has a lot of potential."],
["NoClue Abroad — Tiedät mitä haluat. Et minne olet menossa.","NoClue Abroad — You know what you want. Not where you are going."],
["Mikä on ","What is "],
["NoClue Abroad?","NoClue Abroad?"],
["NoClue Abroad syntyi ajatuksesta, että matkustamisen pitäisi olla helppoa, mutta samalla siinä voisi olla enemmän yllätyksellisyyttä. Asiakas kertoo millaisesta kokemuksesta haaveilee, ja me huolehdimme siitä, että sopiva matka löytyy ilman, että koko kohdetta tarvitsee päättää itse.","NoClue Abroad was created from the idea that travelling should be easy while still having more surprise. The customer tells us what kind of experience they dream of, and we make sure a suitable trip is found without them having to choose the whole destination themselves."],
["MEISTÄ","ABOUT US"],["01 — PALVELU","01 — SERVICE"],["02 — KENELLE SE ON","02 — WHO IT'S FOR"],["03 — MIKSI SE VOI ONNISTUA","03 — WHY IT CAN SUCCEED"],["04 — KILPAILUETU","04 — COMPETITIVE ADVANTAGE"],["05 — YRITYKSEMME","05 — OUR COMPANY"],["06 — KIERTOTALOUS & VASTUULLISUUS","06 — CIRCULAR ECONOMY & RESPONSIBILITY"],["07 — MEGATRENDIT","07 — MEGATRENDS"],
["1. Kerrot ideasi","1. You share your idea"],["2. Me rakennamme kokonaisuuden","2. We build the whole trip"],["3. Sinä koet matkan","3. You experience the trip"],
["Valitset ajankohdan, budjetin ja sellaiset kiinnostuksen kohteet, jotka tekevät matkasta sinulle mielekkään.","You choose the dates, budget and interests that make the trip meaningful to you."],
["Yhdistämme toiveet sopivaksi matkaksi ja etsimme kohteen, jossa suunnitelma toimii myös käytännössä.","We combine your wishes into a suitable trip and find a destination where the plan also works in practice."],
["Saat ennen lähtöä tarvittavat tiedot ja pakkauslistan. Osa matkasta pysyy tarkoituksella yllätyksenä.","You receive the necessary information and a packing list before departure. Part of the trip remains intentionally a surprise."],
["Miksi NoClue Abroad?","Why NoClue Abroad?"],
["Miten erotumme kilpailijoista?","How are we different from competitors?"],
["Sinä tiedät mitä haluat.","You know what you want."],["Me etsimme minne.","We find where."],["Suunnittele matka","Plan a trip"],
["LIIKETOIMINTASUUNNITELMA","BUSINESS PLAN"],["YRITYKSEN TALOUS","COMPANY FINANCES"],["Talouslaskelma.","Financial plan."],
["Laskelma","Calculation"],["Kate = myynti − muuttuvat kulut","Margin = sales − variable costs"],
["Edellinen kuukausi","Previous month"],["Seuraava kuukausi","Next month"],["Kuukausi","Month"],
["Valitse ensin lähtöpäivä ja sitten paluupäivä.","First choose the departure date and then the return date."],
["Lähtö:","Departure:"],["Paluu:","Return:"],["Valitse lähtö- ja paluupäivä","Choose departure and return dates"],["Valitse paluupäivä","Choose a return date"],
["NOCLUE AI — KOHDEVALINTA","NOCLUE AI — DESTINATION SELECTION"],
["Kohde valittiin toiveidesi perusteella. Se sopii erityisesti: ","The destination was selected based on your wishes. It is especially suitable for: "],
["aurinkoiseen säähän","sunny weather"],["rantalomaan","a beach holiday"],["golfia","golf"],["ruokaan","food"],["kaupunkilomaan","a city holiday"],["luontoon","nature"],["seikkailuun","adventure"],
["Oikeassa NoClue-matkassa kohde pysyy matkustajalle salaisena.","On a real NoClue trip, the destination remains secret from the traveller."],
["Valinta tehdään NoClue-kohdevalikoimasta. Tuotantoversiossa mukaan voidaan liittää myös ajantasainen lento-, hotelli- ja hintadata.","The choice is made from the NoClue destination selection. In a production version, current flight, hotel and price data could also be included."],
["vältettävää kohdetta valittu","excluded destinations selected"],
["Tammikuu","January"],["Helmikuu","February"],["Maaliskuu","March"],["Huhtikuu","April"],["Toukokuu","May"],["Kesäkuu","June"],["Heinäkuu","July"],["Elokuu","August"],["Syyskuu","September"],["Lokakuu","October"],["Marraskuu","November"],["Joulukuu","December"],
["Etelä-Eurooppa","Southern Europe"],["Länsi-Eurooppa","Western Europe"],["Keski-Eurooppa","Central Europe"],["Pohjois-Eurooppa","Northern Europe"],["Itä-Aasia","East Asia"],["Kaakkois-Aasia","Southeast Asia"],["Pohjois-Amerikka","North America"],["Oseania","Oceania"],["Etelä-Amerikka","South America"],
["NoClue valitsee yllätysmatkan tästä kohdevalikoimasta. Kohteet on jaettu Euroopan ja muiden alueiden matkailualueisiin.","NoClue chooses the surprise trip from this destination selection. The destinations are divided into travel regions in Europe and other parts of the world."],
["Matkakohde","travel destination"],["Etelä-Eurooppa","Southern Europe"],["Länsi-Eurooppa","Western Europe"],["Keski-Eurooppa","Central Europe"],["Pohjois-Eurooppa","Northern Europe"],["Itä-Aasia","East Asia"],["Kaakkois-Aasia","Southeast Asia"],["Pohjois-Amerikka","North America"],["Oseania","Oceania"],["Etelä-Amerikka","South America"]
);



const NCA_TEXT_ORIGINAL = new WeakMap();
const NCA_ATTR_ORIGINAL = new WeakMap();
const NCA_TRANSLATABLE_ATTRS = ["placeholder","title","aria-label","alt"];

function ncaTranslate(value, language){
  if(!value) return value;
  let result=value;
  const ordered=LANGUAGE_PAIRS.slice().sort((x,y)=>y[0].length-x[0].length);
  for(const [fi,en] of ordered){
    result=result.split(language==="en"?fi:en).join(language==="en"?en:fi);
  }
  return result;
}

function ncaTranslateTree(root, language){
  if(!root) return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
    const node=walker.currentNode;
    const parent=node.parentElement;
    if(parent && (parent.closest(".nca-language-button") || parent.closest("script,style"))) continue;
    if(!NCA_TEXT_ORIGINAL.has(node)) NCA_TEXT_ORIGINAL.set(node,node.nodeValue);
    node.nodeValue=ncaTranslate(NCA_TEXT_ORIGINAL.get(node),language);
  }
  root.querySelectorAll?.(NCA_TRANSLATABLE_ATTRS.map(a=>"["+a+"]").join(",")).forEach(el=>{
    if(el.classList.contains("nca-language-button")) return;
    let originals=NCA_ATTR_ORIGINAL.get(el);
    if(!originals){ originals={}; NCA_ATTR_ORIGINAL.set(el,originals); }
    NCA_TRANSLATABLE_ATTRS.forEach(attr=>{
      if(el.hasAttribute(attr)){
        if(originals[attr]===undefined) originals[attr]=el.getAttribute(attr);
        el.setAttribute(attr,ncaTranslate(originals[attr],language));
      }
    });
  });
}

function ncaTranslateSpecialElements(language){
  const htmlPairs=[
    [".swot-header h1","SWOT-<em>analyysi.</em>","SWOT <em>analysis.</em>"],
    [".feedback-header h1","Vertais<em>palaute.</em>","Peer <em>feedback.</em>"],
    [".responsibility-header h1","Vastuul<em>lisuus.</em>","Responsibi<em>lity.</em>"]
  ];
  htmlPairs.forEach(([selector,fi,en])=>{
    document.querySelectorAll(selector).forEach(el=>{
      el.innerHTML=language==="en"?en:fi;
    });
  });
}

function ncaSetLanguage(language){
  const lang=language==="en"?"en":"fi";
  document.documentElement.lang=lang;
  ncaTranslateTree(document.body,lang);
  ncaTranslateSpecialElements(lang);
  localStorage.setItem("noclueLanguage",lang);
  const button=document.querySelector(".nca-language-button");
  if(button){
    button.textContent=lang==="fi"?"🇬🇧 EN":"🇫🇮 FI";
    button.setAttribute("aria-label",lang==="fi"?"Switch to English":"Vaihda suomeksi");
    button.title=lang==="fi"?"Switch to English":"Vaihda suomeksi";
  }
}

function ncaSetupLanguage(){
  const nav=document.querySelector(".nav");
  if(!nav) return;
  let button=nav.querySelector(".nca-language-button");
  if(!button){
    button=document.createElement("button");
    button.className="nca-language-button";
    button.type="button";
    button.style.cssText="border:1px solid #d9dcd6;background:#fff;color:#17231f;border-radius:999px;padding:10px 13px;font:700 12px 'DM Sans',sans-serif;cursor:pointer;white-space:nowrap;flex:0 0 auto;";
    nav.appendChild(button);
  }
  button.onclick=()=>{
    const current=document.documentElement.lang==="en"?"en":"fi";
    ncaSetLanguage(current==="en"?"fi":"en");
  };
  const saved=localStorage.getItem("noclueLanguage");
  ncaSetLanguage(saved==="en"?"en":"fi");
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",ncaSetupLanguage,{once:true});
}else{
  ncaSetupLanguage();
}

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