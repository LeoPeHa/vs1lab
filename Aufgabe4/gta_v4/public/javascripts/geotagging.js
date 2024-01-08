// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation() {
    if (document.getElementById("latitude").value == "" || document.getElementById("longitude").value == "") {
        LocationHelper.findLocation(convertLocation);
    }
}

function updateDepiction() {
    LocationHelper.findLocation(convertLocation);
}

function convertLocation(helper) {
    let newLatitude = helper.latitude;
    let newLongitude = helper.longitude;
    updateLabels("latitude", newLatitude);
    updateLabels("longitude", newLongitude);
    updateLabels("discoverLatitude", newLatitude);
    updateLabels("discoverLongitude", newLongitude);
    let manager = new MapManager('jTGAw5xtpzLEiMWObzXknsZZjViFuEwj');
    let taglist_json = JSON.parse(document.getElementById("mapView").dataset.tags);
    
    document.getElementById("mapView").src = manager.getMapUrl(newLatitude, newLongitude, taglist_json);
    console.log(taglist_json);
    let resultList = "";
    taglist_json.forEach((element) => resultList += "<li>" + element.name + " (" + element.latitude + "," + element.longitude + ") " + element.hashtag + "</li>");
    document.getElementById("discoveryResults").innerHTML = resultList;
}

function updateLabels(id, value) {
    document.getElementById(id).setAttribute("value", value);
    document.getElementById(id).setAttribute("placeholder", value);
}


// AJAX functions
async function handleTagging(submitEvent) {
    submitEvent.preventDefault();
    
    await fetch("/api/geotags", {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name : document.getElementById('name').value,
            latitude : document.getElementById('latitude').value,
            longitude : document.getElementById('longitude').value,
            hashtag : document.getElementById('hashtag').value
        })
    });
    updateDepiction();
}

async function handleDiscover(submitEvent) {
    submitEvent.preventDefault();

    const latitude = document.getElementById('discoverLatitude').value;
    const longitude = document.getElementById('discoverLongitude').value;
    const query = document.getElementById('searchTerm').value;

    let url = `/api/geotags?latitude=${latitude}&longitude=${longitude}`;

    if (query != "") {
        url += `&searchTerm=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url);
    const responseBody = await response.json();

    const mapView = document.getElementById("mapView");
    mapView.setAttribute("data-tags", JSON.stringify(responseBody));
    updateDepiction();
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    //alert("Please change the script 'geotagging.js'");
    updateLocation();
    document.getElementById("tag-form").addEventListener("submit", handleTagging);
    document.getElementById("discoveryFilterForm").addEventListener("submit", handleDiscover);
});