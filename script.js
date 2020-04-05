// votre code JS MAP
var mymap = L.map('mapid').setView([48.8582, 2.2945], 13);
var layerGroup = L.layerGroup().addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg'
}).addTo(mymap);


//INTEGRATION API
async function getData(query) {
    if (!query) {
        query = "";
        }
    let url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=" + query + "&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type"
    let response = await fetch(url)

    layerGroup.clearLayers();


    console.log(url)

    let data = await response.json()

    data.records.forEach(function (event) {
        // le titre de l'événement
        let title = event.fields.title
        //console.log(event.fields.title)

        // si jamais le champs latitude/longitude manque
        // on ignore cet événement
        if (!event.fields.lat_lon) {
            return;
        }

        // la latitude
        let latitude = event.fields.lat_lon[0]

        // la longitude
        let longitude = event.fields.lat_lon[1]
        // on pourrait récupérer d'autres infos..

        // pour tester, on les affiche dans la console
        //console.log(title + " " + latitude + " " + longitude)

        let marker = L.marker([latitude, longitude]);

        // Ajouter un PopUp avec la fonction bindPopup

        let cover_url = event.fields.cover_url;
        let date = event.fields.date_description;
        let price = event.fields.price_detail;
        let address_street = event.fields.address_street;


        let content = title + "<br>" + "<img class= imgPopup src='" + cover_url + "'>" + "<br>" + price + "<br>" + date + "<br>" + address_street;
        marker.bindPopup(content);
        //console.log(event.fields)



        //Ajouter à la carte
        marker.addTo(layerGroup)
        

        // .. mais ce serait mieux de les afficher sur la carte !
    })
}

getData()

function onformSubmit(event) {
    event.preventDefault();
    getData(searchInput.value);

}
