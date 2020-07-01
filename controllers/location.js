var Location = require('../models/contacts');

// display a list of locations
const location_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Location list');
};

// display detail page for a specific location
const location_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Location detail: ' + req.params.id);
};

module.exports ={ location_detail, location_list }