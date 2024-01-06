// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */


const GeoTag = require('./geotag');
const GeoTagExamples = require('./geotag-examples');


class InMemoryGeoTagStore {

    #geoTagArray;

    constructor() {
        this.#geoTagArray = [];
    }

    populate() {

        let tagList = GeoTagExamples.tagList;

        for (let i = 0; i < tagList.length; i++) {
            let newTag = new GeoTag(tagList[i][0], tagList[i][1], tagList[i][2], tagList[i][3]);
            this.addGeoTag(newTag);
        }
    }

    addGeoTag(geoTag) {
        this.#geoTagArray.push(geoTag);
    }

    removeGeoTag(name) {
        let index = name.indexOf(name);
        this.#geoTagArray = geoTagArray.splice(index, 1);
    }

    searchNearbyGeoTags(geoTag, searchTerm) {

        let radius = 0.5;
        let paramLatitude = geoTag.latitude;
        let paramLongitude = geoTag.longitude;
        let term = searchTerm;
        let returnArray = [];
        
        for (let i = 0; i < this.#geoTagArray.length; i++) {
            let arrayElementLatitude = this.#geoTagArray[i].latitude;
            let arrayElementLongitude = this.#geoTagArray[i].longitude;
            let arrayElementName = this.#geoTagArray[i].name;
            let arrayElementTag = this.#geoTagArray[i].hashtag;
            let distance = Math.sqrt((arrayElementLongitude - paramLongitude)*(arrayElementLongitude - paramLongitude) + (arrayElementLatitude - paramLatitude)*(arrayElementLatitude - paramLatitude))
            if ((distance < radius) && (arrayElementName.includes(term) || arrayElementTag.includes(term))) {
                returnArray.push(this.#geoTagArray[i]);
            }
        }
        return returnArray;

    }

    getNearbyGeoTags(location) {
        
        let radius = 0.1;
        let paramLatitude = location[0];
        let paramLongitude = location[1];
        let returnArray = [];
        
        for (let i = 0; i < this.#geoTagArray.length; i++) {
            let arrayElementLatitude = this.#geoTagArray[i].latitude;
            let arrayElementLongitude = this.#geoTagArray[i].longitude;
            let distance = Math.sqrt((arrayElementLongitude - paramLongitude)*(arrayElementLongitude - paramLongitude) + (arrayElementLatitude - paramLatitude)*(arrayElementLatitude - paramLatitude))
            if (distance < radius) {
                returnArray.push(this.#geoTagArray[i]);
            }
        }
        return returnArray;

    }
}

module.exports = InMemoryGeoTagStore
