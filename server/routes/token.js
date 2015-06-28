var request  = require('request'),
    qs       = require('querystring'),
    config   = require('../config.json');

module.exports = function (req,res,next){
  request.post('https://api.clarifai.com/v1/token/', {form: {
    grant_type: 'client_credentials',
    client_id: config.clarifai_id,
    client_secret: config.clarifai_secret
  }}, function(err, request, body){
    req._token = JSON.parse(body).access_token;

    next();
  });
};