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
class InMemoryGeoTagStore {

    #geoTagArray;

    constructor() {
        this.#geoTagArray = [];
    }

    addGeoTag(geoTag) {
        this.#geoTagArray.push(geoTag);
    }

    removeGeoTag(name) {
        let index = name.indexOf(name);
        this.#geoTagArray = geoTagArray.splice(index, 1);
    }

    searchNearbyGeoTags(location, searchTerm) {
        
        let radius = 0.1;
        let paramLatitude = location[0];
        let paramLongitude = location[1];
        let term = searchTerm;
        let returnArray;
        
        for (let i = 0; i < this.#geoTagArray.length; i++) {
            let arrayElementLatitude = geoTagArray[i].latitude;
            let arrayElementLongitude = geoTagArray[i].longitude;
            let arrayElementName = geoTagArray[i].name;
            let arrayElementTag = geoTagArray[i].hashtag;
            let distance = Math.sqrt((arrayElementLongitude - paramLongitude)*(arrayElementLongitude - paramLongitude) + (arrayElementLatitude - paramLatitude)*(arrayElementLatitude - paramLatitude))
            if ((distance < radius) && (arrayElementName.includes(term) || arrayElementTag.includes(term))) {
                returnArray.push(geoTagArray[i]);
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
