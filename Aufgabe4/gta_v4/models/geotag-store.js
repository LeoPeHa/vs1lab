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
    #Id;

    constructor() {
        this.#geoTagArray = [];
        this.#Id = 0;
    }

    populate() {

        let tagList = GeoTagExamples.tagList;

        for (let i = 0; i < tagList.length; i++) {
            let newTag = new GeoTag(tagList[i][0], tagList[i][1], tagList[i][2], tagList[i][3]);
            this.addGeoTag(newTag);
        }
    }

    addGeoTag(geoTag) {
        geoTag.id = this.#Id;
        this.#geoTagArray.push(geoTag);
        this.#Id++;
        return (this.#Id - 1);
    }

    removeGeoTag(name) {
        let index = name.indexOf(name);
        this.#geoTagArray = this.#geoTagArray.splice(index, 1);
    }

    deleteGeoTag(id) {
        
        const idLookedFor = id;
        
        for (let i = 0; i < this.#geoTagArray.length; i++) {
            let currentId = this.#geoTagArray[i].id;
            if (currentId == idLookedFor) {
                return this.#geoTagArray.splice(i, 1);
            }
        }

        return "";
        
    }

    replaceGeoTag(id, geoTag) {

        let isFound = 0;
        
        for (let i = 0; i < this.#geoTagArray.length; i++) {
            if (this.#geoTagArray[i].id == id) {
                this.#geoTagArray[i] = geoTag;
                isFound = 1;
            }
        }

        if (isFound == 0) {
            newTag = geoTag;
            newTag.id = id;
            this.addGeoTag(newTag);
        }
    }

    returnGeotags() {
        if (this.#geoTagArray.length == 0) {
            this.#geoTagArray.populate;
            let returnArray = this.#geoTagArray;
            return returnArray;
        } else {
            let returnArray = this.#geoTagArray;
            return returnArray;
        }
    }

    searchGeoTags(searchTerm) {

        const term = searchTerm;
        let returnArray = [];
        
        for (let i = 0; i < this.#geoTagArray.length; i++) {
            
            let arrayElementName = this.#geoTagArray[i].name;
            let arrayElementTag = this.#geoTagArray[i].hashtag;
            
            if (arrayElementName.includes(term) || arrayElementTag.includes(term)) {
                returnArray.push(this.#geoTagArray[i]);
            }
        }
        return returnArray;

    }

    searchGeoTagsAroundLocation(searchTerm, latitude, longitude) {

        let radius = 0.5;
        let paramLatitude = latitude;
        let paramLongitude = longitude;
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

    getGeoTagById(id) {
        
        const idLookedFor = id;
        
        for (let i = 0; i < this.#geoTagArray.length; i++) {
            if (this.#geoTagArray[i].id == idLookedFor) {
                console.log("Geotag mit id " + this.#geoTagArray[i].id + " wird für id " + idLookedFor + " zurückgegeben.")
                return this.#geoTagArray[i];
            }
        }

        return "";
    }
}

module.exports = InMemoryGeoTagStore
