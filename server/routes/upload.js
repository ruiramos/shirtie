var request  = require('request'),
    qs       = require('querystring'),
    config   = require('../config.json');

var imageUpload = function(req, res, next){
  var image = req.body.image;//.replace(/^data:image\/png;base64,/, "");

  var options = {
    uri: 'https://api.clarifai.com/v1/tag/',
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + config.clarifai_token
    },
    json: {
      encoded_data: image
    }
  };

  // Get tags
  request(options, function (error, response, body) {
    console.log(body.results[0].result);
    if (!error && response.statusCode == 200) {
      res.send(response.body);
    }
  });
};

module.exports = imageUpload;