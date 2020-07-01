var Service_provider = require('../models/contacts');

// display a list of service providers
const service_provider_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Service provider list');
};

// display detail page for a specific service provider
const service_provider_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Service provider detail: ' + req.params.id);
};

module.exports ={ service_provider_detail, service_provider_list }