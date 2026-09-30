/* NoClue Abroad standalone language switcher */
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

const NCA_TEXT_ORIGINAL=new WeakMap();
const NCA_ATTR_ORIGINAL=new WeakMap();
const NCA_TRANSLATABLE_ATTRS=["placeholder","title","aria-label","alt"];

function ncaTranslate(value,language){
  if(!value) return value;
  let result=value;
  const ordered=LANGUAGE_PAIRS.slice().sort((a,b)=>b[0].length-a[0].length);
  for(const pair of ordered){
    const fi=pair[0], en=pair[1];
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
  const htmlPairs=[
    [".swot-header h1","SWOT-<em>analyysi.</em>","SWOT <em>analysis.</em>"],
    [".feedback-header h1","Vertais<em>palaute.</em>","Peer <em>feedback.</em>"],
    [".responsibility-header h1","Vastuul<em>lisuus.</em>","Responsibi<em>lity.</em>"]
  ];
  htmlPairs.forEach(([selector,fi,en])=>{
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
    button.textContent=lang==="fi"?"🇬🇧 EN":"🇫🇮 FI";
    button.setAttribute("aria-label",lang==="fi"?"Switch to English":"Vaihda suomeksi");
    button.title=lang==="fi"?"Switch to English":"Vaihda suomeksi";
  });
}
function ncaToggleLanguage(event){
  if(event){event.preventDefault();event.stopPropagation();}
  ncaSetLanguage(document.documentElement.lang==="en"?"fi":"en");
}
window.ncaSetLanguage=ncaSetLanguage;
window.ncaToggleLanguage=ncaToggleLanguage;
document.addEventListener("click",function(event){
  const button=event.target.closest&&event.target.closest(".nca-language-button");
  if(button){event.preventDefault();event.stopPropagation();ncaSetLanguage(document.documentElement.lang==="en"?"fi":"en");}
},true);

function ncaSetupLanguage(){
  document.querySelectorAll(".nca-language-button").forEach(button=>{
    if(button.parentElement!==document.body) document.body.appendChild(button);
    button.style.position="fixed";
    button.style.top="12px";
    button.style.right="20px";
    button.style.zIndex="2147483647";
    button.style.pointerEvents="auto";
  });
  let saved="fi";
  try{saved=localStorage.getItem("noclueLanguage")||"fi";}catch(e){}
  ncaSetLanguage(saved==="en"?"en":"fi");
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ncaSetupLanguage,{once:true});
else ncaSetupLanguage();
