var request  = require('request'),
    qs       = require('querystring'),
    config   = require('../config.json'),
    FormData = require('form-data'),
    fs       = require('fs'),
    path     = require('path');

var imageUpload = function(req, res, next){
  var image = req.files.img;

  var options = {
    uri: 'https://api.clarifai.com/v1/tag/',
    method: 'POST',
    headers: {
      // 'Content-Type':  'Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryBToojuHvil2KJYIJ',
      'Authorization': 'Bearer ' + config.clarifai_token
    }
  };

  // Create new form
  var form = new FormData();

  // Append image to form
  form.append("encoded_data", fs.createReadStream(path.resolve(__dirname, "../../" + image.path)));

  form.getLength(function(err, length){
    // Handle errors
    if (err) {
      return requestCallback(err);
    }

    // Create response
    var r = request(options, requestCallback);
    r._form = form;

    // Set extra form headers
    r.setHeader('content-length', length);
    var headers = form.getHeaders();
    for(var header in headers){
      r.setHeader(header, headers[header]);
    }
  });

  function requestCallback(err, response, body) {
    res.send(body);
  }
};

module.exports = imageUpload;