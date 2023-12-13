// File origin: VS1LAB A3

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 * 
 * TODO: implement the module in the file "../models/geotag.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 * 
 * TODO: implement the module in the file "../models/geotag-store.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
let geoTagStore = new GeoTagStore();
geoTagStore.populate();

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

// TODO: extend the following route example if necessary
router.get('/', (req, res) => {
  res.render('index', { taglist: [] });
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored.
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags 
 * by radius around a given location.
 */

// TODO: ... your code here ...
router.post('/tagging', (req, res) => {
  let {tagName, latitude, longitude, hashtag} = req.body;

  parsedLatitude = parseFloat(latitude);
  parsedLongitude = parseFloat(longitude);
  const newTag = new GeoTag(tagName, parsedLatitude, parsedLongitude, hashtag);
  geoTagStore.addGeoTag(newTag);

  const taglist = geoTagStore.getNearbyGeoTags(newTag);
  console.log("tagging is called");
  console.log(taglist);
  taglist.forEach( tag => console.log(tag.toString()));
  res.render('index', { taglist : taglist, parsedLatitude, parsedLongitude})
});

/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain 
 * the term as a part of their names or hashtags. 
 * To this end, "GeoTagStore" provides methods to search geotags 
 * by radius and keyword.
 */

// TODO: ... your code here ...
router.post('/discovery', (req, res) => {
  console.log("Übergebener Body:")
  console.log(req.body);
  let searchTerm = req.body.searchterm;
  let discoverLatitude = req.body.latitude;
  let discoverLongitude = req.body.longitude;
  const newTag = new GeoTag(searchTerm, discoverLatitude, discoverLongitude, "#");
  console.log("Neuer Tag:")
  console.log(newTag);
  console.log("Suchergebnis: ");
  console.log(geoTagStore.searchNearbyGeoTags(newTag, searchTerm));
  const results = geoTagStore.searchNearbyGeoTags(newTag, searchTerm);
  res.render('index', { taglist: results , latitude : discoverLatitude, longitude: discoverLongitude})
});

module.exports = router;
