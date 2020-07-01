const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const rp = require("request-promise");
const { ensureAuth } = require('../middleware/auth')
const { healthResponse, healthy, unhealthy } = require('../middleware/health')

const WEBCHAT_SECRET = process.env.WEBCHAT_SECRET;
const DIRECTLINE_ENDPOINT_URI = process.env.DIRECTLINE_ENDPOINT_URI;
const APP_SECRET = process.env.APP_SECRET;
const directLineTokenEp = `https://${DIRECTLINE_ENDPOINT_URI || "directline.botframework.com"}/v3/directline/tokens/generate`;

function isUserAuthenticated() {
  // add here the logic to verify the user is authenticated
  return true;
}

const appConfig = {
  isHealthy: false,
  options: {
    method: 'POST',
    uri: directLineTokenEp,
    headers: {
      'Authorization': 'Bearer ' + WEBCHAT_SECRET
    },
    json: true
  }
};



/* GET home page. */
router.get('/', ensureAuth, (req, res, next) => {
  res.render('404');
});

/* GET chat page */
router.get('/chat', ensureAuth, (req, res, next) => {
  res.render('chat');
});

/** GET emergency contacts */
// router.get('/emergency-contacts', (req, res) => {
//   res.render('contacts')
// })

// GET emergency contacts
router.get('/', function(req, res) {
  res.redirect('/emergency');
});

router.post('/chatbot', (req, res) => {
  const { userId, displayName } = req.user
  res.cookie("userId", userId);

  rp(appConfig.options)
    .then(function (parsedBody) {

      var response = {};
      response['userId'] = userId;
      response['userName'] = displayName;
      response['locale'] = req.query.locale;
      response['connectorToken'] = parsedBody.token;

      if (req.query.lat && req.query.long) {
        response['location'] = { lat: req.query.lat, long: req.query.long };
      }
      response['directLineURI'] = DIRECTLINE_ENDPOINT_URI;
      const jwtToken = jwt.sign(response, APP_SECRET);
      res.send(jwtToken);
    })
    .catch(function (err) {
      appConfig.isHealthy = false;
      res.status(err.statusCode).send();
      console.log("failed");
    });
})

router.get('/health', (req, res) => {
  if (!appConfig.isHealthy) {
    rp(appConfig.options)
      .then((body) => {
        appConfig.isHealthy = true;
        healthy(res);
      })
      .catch((err) => {
        unhealthy(res);
      });
  }
  else {
    healthy(res);
  }
});

module.exports = router;
