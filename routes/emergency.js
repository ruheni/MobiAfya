var express = require('express');
var router = express.Router();

// require emergency modules
var {contact_detail, contact_list} = require('../controllers/contact');
var {location_detail, location_list} = require('../controllers/location');
var {service_provider_detail, service_provider_list} = require('../controllers/service_provider');
var {service_detail, service_list} = require('../controllers/service');

router.get('/', (req, res)=> {
  res.json({status: 200, message: "It works"})
});

// GET request for one contact
router.get('/contact/:id', contact_detail);

// GET request for list of all contacts
router.get('/contacts', contact_list);

// GET request for one location
router.get('/location/:id', location_detail);

// GET request for list of all locations
router.get('/locations', location_list);

// GET request for one service provider
router.get('/service_provider/:id', service_provider_detail);

// GET request for list of all service providers
router.get('/service_providers', service_provider_list);

// GET request for one service
router.get('/service/:id', service_detail);

// GET request for list of all services
router.get('/services', service_list);

// route parameters
// router.get('/location/:locationId/service_providers/:service_providerId', function (req, res) {
    // Access locationId via: req.params.locationId
    // Access service_providerId via: req.params.service_providerId
  //   res.send(req.params);
  // })

function runAsyncWrapper (callback) {
    return function (req, res, next) {
      callback(req, res, next)
        .catch(next)
    }
}
router.get('/location/:locationId/service_providers/:service_providerId', runAsyncWrapper(async(req, res) => {
    // Access locationId via: req.params.locationId
    // Access service_providerId via: req.params.service_providerId
    await res.send(req.params);
}));

module.exports = router;