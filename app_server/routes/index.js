var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations')
var ctrlOthers = require('../controllers/others');

/* Locations page. */
router.get('/', ctrlLocations.homeList);
router.get('/location',ctrlLocations.locationInfo);
router.get('/location/review/new/', ctrlLocations.addReview);

/* Other Pages*/
router.get('/about', ctrlOthers.about);

module.exports = router;