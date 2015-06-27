var request  = require('request'),
    qs       = require('querystring'),
    config   = require('../config.json'),
    FormData = require('form-data'),
    fs       = require('fs'),
    path     = require('path'),
    imageCtrl= require('../controllers/imageGenerator');

// List of black-listed meaningless tags
var exclude = ['black and white', 'isolated'];

var imageUpload = function(req, res, next){
  var image = req.files.img;

  var options = {
    uri: 'https://api.clarifai.com/v1/tag/',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + config.clarifai_token
    }
  };

  // Create new form
  var form = new FormData();

  // Append image to form
  var bufs = [];
  // form.append("encoded_data", fs.createReadStream(path.resolve(__dirname, "../../" + image.name)));

  imageCtrl.getResizedStream(image.name, function(err, stdout, stderr){
    console.log('!!!!!!!!!!!!!!!!!')
    console.log(arguments);
    stdout.on('data', function(d){bufs.push(d); });

    stdout.on('end', function(){
      var buf = new Buffer(bufs);
    
      form.append("encoded_data", buf);
    
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
    });
  });

  function requestCallback(err, response, body) {
    // We have the tags
    res.send(body);
  }
};

module.exports = imageUpload;