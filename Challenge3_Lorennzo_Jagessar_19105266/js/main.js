//LOCATION API (MAPBOX)/////////////////////////////////////////////////////////////////////////////////////////////////////
mapboxgl.accessToken = 'pk.eyJ1IjoiamxvOTY5NyIsImEiOiJja214dWFqd3cwczh5MnJxc2o1YW52NHR2In0.Rs5eKeKeCGIFLvY20KlBYA';
var map = new mapboxgl.Map({
    container: 'map', //container ID, de container linken aan je html
    style: 'mapbox://styles/mapbox/navigation-preview-night-v4', //style van de Mapbox
    center: [4.468063,52.059803], //waar de map naar centreert
    zoom: 10 // hoe ver die zoomt
});

map.addControl( //een geocoder erin zetten om het functie te geven dat je locaties kan opzoeken
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
)

//Markers//
var homemarker = new mapboxgl.Marker() //marker aanmaken
    .setLngLat([4.468063,52.059803]) //locatie aangeven
    .addTo(map); //toevoegen aan de map

var floridamarker = new mapboxgl.Marker({color: 'orange'})
    .setLngLat([-80.191788, 25.761681])
    .addTo(map);

var nevadamarker = new mapboxgl.Marker({color: 'green'})
    .setLngLat([-116.424558,38.807611])
    .addTo(map);

var arabiamarker = new mapboxgl.Marker({color: 'yellow'})
    .setLngLat([45.782902,24.006326])
    .addTo(map);

var tokyomarker = new mapboxgl.Marker({color: 'purple'})
    .setLngLat([139.839478,35.652832])
    .addTo(map);

// popups //
var popupgreenland = new mapboxgl.Popup({ closeOnClick: false}) //popup maken
    .setLngLat([-42.604301, 71.706940]) //locatie aangeven
    .setHTML('<h3>Low population, higher risk of dying</h3>') //aangeven wat voor een tekst erin moet zitten
    .addTo(map); //toevoegen aan de map

var popupantarctica = new mapboxgl.Popup({ closeOnClick: false})
    .setLngLat([22.362884, -78.903929])
    .setHTML('<h3>Very low population, highest risk of dying</h3>')
    .addTo(map);

var popupnorthkorea = new mapboxgl.Popup({ closeOnClick: false})
    .setLngLat([126.604968, 39.232253])
    .setHTML('<h3>Danger Zone!</h3>')
    .addTo(map);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//WEATHER API (OPENWEATHERMAP)//////////////////////////////////////////////////////////////////////////////////////////////////////////
function weatherapi(){
    var key = 'https://api.openweathermap.org/data/2.5/weather?appid=2f4c13e4bd5b3aad42fb93627ad78734&q=';
    var cityinput = document.getElementById('place').value;

    var req = key + cityinput; //maakt een combo van de request

    fetch(req) //krijg het huidige weerbericht

    .then(function(response){ //omzetten naar JSON formaat
        if(!response.ok) throw Error(response.statusText);
        return response.json();
    })

    .then(function(response){ //pakt de weersgegevens
        apiweather(response);
    })

    .catch(function(error){ //geeft een error aan wanneer deze gepakt wordt
        apifault(error);
    });
}

function apiweather(response){ //functie om de weergegevens te laten zien
    var cityname = response.name; //naam van de stad
    var countryname = response.sys.country; //initialen van het land
    var tempcel = Math.floor(response.main.temp - 273.15); //de huidige temperatuur omgezet in graden celcius
    var feelslike = Math.floor(response.main.feels_like - 273.15); //hoe de temperatuur eigenlijk aanvoelt, omgezet in celcius
    var descr = response.weather[0].description; //hoe het weer eruit ziet
    var showstatus = document.getElementById('weatherstatus'); //linken naar de ID in je HTML

    showstatus.innerHTML = cityname + ',' + ' ' + countryname + '<br>' + tempcel + ' ' + '&#176;C <br>' + 'Feels like' + ' ' + feelslike + ' ' + '&#176;C <br>' + descr;
    //laat alle gegevens in één string zien//
}

function apifault(error){
    var showstatus = document.getElementById('weatherstatus'); //linken naar de ID in de HTML
    showstatus.innerHTML = 'This city does not exist <br> Try again' //dit staat in de HTML wanneer deze een error opvangt
}

/*
    //////DISCLAIMER////////
    de code werkt wel als normale bestand, maar niet wanneer deze in Github staat. Dit zal je zien wanneer je de github link opent.
    Ik heb de code ter controle naar andere personen gestuurd om te kijken of de deze API ook bij hun werkt. Resultaat: het werkt wel wanneer ze mijn bestand gebruiken, maar ook niet wanneer
    de Github link gebruiken. Indien de Github link toch werkt, kunt u dit bericht negeren
    !!!!!ZIE BIJGELEVERDE AFBEELDING (IS EEN ERROR MELDING) STAAT BIJ DE PICTURES FOLDER!!!!!!
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ANIME QUOTATION API (ANIMECHAN)///////////////////////////////////////////////////////////////////////
function quoteapi(){
    var key2 = 'https://animechan.vercel.app/api/random'; //de request
    
    fetch(key2) //pakt de quote

    .then(function(response){ //zet respons om naar JSON format
        return response.json();
    })

    .then(function(quote){ //iets doen met de respons
        console.log(quote); //laat de respons zien in de console

        var anime = quote.anime; // de anime serie oproepen
        var kwoot = quote.quote; // de quote oproepen
        var character = quote.character; // de character oproepen

        document.getElementById('quote').innerHTML = '"' + kwoot + '"'; //linken naar ID en het laten zien door innerHTML
        document.getElementById('character').innerHTML = '-' + ' ' + character; //linken naar ID en het laten zien door innerHTML
        document.getElementById('anime').innerHTML = 'From' + ' ' + anime; //linken naar ID en het laten zien door innerHTML
    })
}
quoteapi(); //functie oproepen
//////////////////////////////////////////////////////////////////////////////////