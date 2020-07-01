var Service = require('../models/contacts');

// display a list of services
const service_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Service list');
};

// display detail page for a specific service
const service_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Service detail: ' + req.params.id);
};

module.exports ={ service_detail, service_list }