// File origin: VS1LAB A3, A4

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
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
let geoTagStore = new GeoTagStore();
geoTagStore.populate();

// App routes (A3)

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

router.get('/', (req, res) => {
  res.render('index', { taglist: [] , latitude: "", longitude: ""});
});

/**
 * Old functions
 */
router.post('/tagging', (req, res) => {
  let {name, latitude, longitude, hashtag} = req.body;

  parsedLatitude = parseFloat(latitude);
  parsedLongitude = parseFloat(longitude);
  const newTag = new GeoTag(name, parsedLatitude, parsedLongitude, hashtag);
  geoTagStore.addGeoTag(newTag);

  const taglist = geoTagStore.getNearbyGeoTags(newTag);
  taglist.forEach( tag => console.log(tag.toString()));
  res.render('index', { taglist : taglist, latitude: parsedLatitude, longitude: parsedLongitude})
});

router.post('/discovery', (req, res) => {
  let searchTerm = req.body.searchterm;
  let discoverLatitude = req.body.latitude;
  let discoverLongitude = req.body.longitude;
  const newTag = new GeoTag(searchTerm, discoverLatitude, discoverLongitude, "#");
  const results = geoTagStore.searchNearbyGeoTags(newTag, searchTerm);
  res.render('index', { taglist: results , latitude : discoverLatitude, longitude: discoverLongitude})
});

// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

router.get('/api/geotags', (req, res) => {
    const searchTerm = req.body.searchTerm;
    console.log(searchTerm)
    const discoverLatitude = req.body.latitude;
    const discoverLongitude = req.body.longitude;

    let tagList = [];

    if (searchTerm) {
      if (latitude != null && longitude != null) {
        tagList = geoTagStore.searchGeoTagsAroundLocation(searchTerm, discoverLatitude, discoverLongitude);
      } else {
        tagList = geoTagStore.searchGeoTags(searchTerm);
      }
    } else {
      tagList = geoTagStore.returnGeotags();
    }

    res.json(tagList);

});


/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

router.post('/api/geotags', (req, res) => {

  const name = req.body.name;
  const latitude = parseFloat(req.body.latitude);
  const longitude = parseFloat(req.body.longitude);
  const hashtag = req.body.hashtag;
  
  let id = geoTagStore.addGeoTag(new GeoTag(name, latitude, longitude, hashtag));
  
  res.setHeader('Location', `/api/geotags/${id}`);
  res.sendStatus(201);
});


/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */

router.get('/api/geotags/:id', (req, res) => {
  
  const id = req.params.id;

  let geoTag = geoTagStore.getGeoTagById(id);
  res.json(geoTag);
});


/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 * 
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response. 
 */

router.put('/api/geotags/:id', (req, res) => {
  const id = req.params.id;
  const latitude = parseFloat(req.body.latitude);
  const longitude = parseFloat(req.body.longitude);
  const name = req.body.name;
  const hashtag = req.body.hashtag;

  let geoTag = geoTagStore.replaceGeoTag(id, new GeoTag(name, latitude, longitude, hashtag, id));
  res.json(geoTag);

});


/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

router.delete('/api/geotags/:id', (req, res) => {
  const id = req.params.id;
  console.log("req.params.id: " + req.params.id)
  
  let geoTag = geoTagStore.getGeoTagById(id);
  res.json(geoTagStore.deleteGeoTag(geoTag.id));
});

module.exports = router;
