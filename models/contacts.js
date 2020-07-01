// emergency contacts module

var express = require('express');
var router = express.Router();

// emergency contacts route
router.get('/emergency-contacts', (req, res) => {
    res.render('contacts')
  })

module.exports = router;
