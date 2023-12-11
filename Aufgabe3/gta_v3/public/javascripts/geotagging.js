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

function convertLocation(helper) {
    let newLatitude = helper.latitude;
    let newLongitude = helper.longitude;
    updateLabels("latitude", newLatitude);
    updateLabels("longitude", newLongitude);
    updateLabels("discoverLatitude", newLatitude);
    updateLabels("discoverLongitude", newLongitude);
    let manager = new MapManager('jTGAw5xtpzLEiMWObzXknsZZjViFuEwj');
    console.log(document.getElementById("mapView").dataset.tags);
    let taglist_json = JSON.parse(document.getElementById("mapView").dataset.tags);
    document.getElementById("mapView").src = manager.getMapUrl(newLatitude, newLongitude, taglist_json);
}

function updateLabels(id, value) {
    document.getElementById(id).setAttribute("value", value);
    document.getElementById(id).setAttribute("placeholder", value);
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    //alert("Please change the script 'geotagging.js'");
    updateLocation();
});