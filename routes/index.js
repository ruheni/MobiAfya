require('dotenv').config();
const crypto = require('crypto');
var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const rp = require("request-promise");

const WEBCHAT_SECRET = process.env.WEBCHAT_SECRET;
const DIRECTLINE_ENDPOINT_URI = process.env.DIRECTLINE_ENDPOINT_URI;
const APP_SECRET = process.env.APP_SECRET;
const directLineTokenEp = `https://${DIRECTLINE_ENDPOINT_URI || "directline.botframework.com"}/v3/directline/tokens/generate`;

const region = process.env.REGION || "Unknown";

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

function healthResponse(res, statusCode, message) {
  res.status(statusCode).send({
    health: message,
    region: region
  });
}

function healthy(res) {
  healthResponse(res, 200, "Ok");
}

function unhealthy(res) {
  healthResponse(res, 503, "Unhealthy");
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/chatbot', function (req, res) {
  if (!isUserAuthenticated()) {
    res.status(403).send();
    return;
  }

  // rp(graphOptions).then(res => console.log(res))

  rp(appConfig.options)
    .then(function (parsedBody) {
      var userid = req.query.userId || req.cookies.userid;
      if (!userid) {
        userid = crypto.randomBytes(4).toString('hex');
        res.cookie("userid", userid);
      }

      var response = {};
      response['userId'] = userid;
      response['userName'] = req.query.userName;
      response['locale'] = req.query.locale;
      response['connectorToken'] = parsedBody.token;

      /*
      //Add any additional attributes
      response['optionalAttributes'] = {age: 33};
      */

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

router.get('/health', function (req, res) {
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
