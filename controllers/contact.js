var Contact = require('../models/contacts');

// Display list of all contacts
const contact_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Contact list: ' + req.params.id);
};

exports.contact_list = function(req, res, next) {

    Contact.find({}, 'service_provider_list contact')
      .populate('contact')
      .exec(function (err, list_contacts) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('contact_list', { service_provider: 'Contact List', contact_list: list_contacts });
      });
      
  };

// display detail page for a specific contact
const contact_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Contact detail: ' + req.params.id);
};

module.exports ={ contact_detail, contact_list }
