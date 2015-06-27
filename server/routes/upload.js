var request  = require('request'),
    qs       = require('querystring'),
    config   = require('../config.json'),
    FormData = require('form-data'),
    fs       = require('fs'),
    path     = require('path'),
    imageCtrl= require('../controllers/imageGenerator');

// List of black-listed meaningless tags
var exclude = ['black and white', 'isolated', 'adult', 'portrait','adult'];

var imageUpload = function(req, res, next){
  var image = req.files.img;

  var options = {
    uri: 'https://api.clarifai.com/v1/tag/',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + config.clarifai_token
    }
  };

  // Resize image
  var stream = fs.createWriteStream(path.resolve(__dirname, "../../uploads/" + image.name.split('.')[0] + '_r.' + image.extension));

  // Pipe the resized image
  imageCtrl.getResizedStream(image.name, stream);

  stream.on('finish', function(err){
    options.formData = {
      "encoded_data": fs.createReadStream(path.resolve(__dirname, "../../uploads/" + image.name.split('.')[0]+ '_r.' + image.extension))
    };

    var r = request(options, requestCallback);
  });


    // // Create new form
    // var form = new FormData();

    // // Append image to form
    // form.append("encoded_data", fs.createReadStream(path.resolve(__dirname, "../../uploads/" + image.name.split('.')[0]+ '_r.' + image.extension)));

    // // Submit form
    // form.getLength(function(err, length){
    //   // Handle errors
    //   if (err) {
    //     return requestCallback(err);
    //   }

    //   // Create response
    //   var r = request(options, requestCallback);
    //   r._form = form;

    //   // Set extra form headers
    //   r.setHeader('content-length', length);
    //   var headers = form.getHeaders();
    //   for(var header in headers){
    //     r.setHeader(header, headers[header]);
    //   }
    //});

  function requestCallback(err, response, body) {
    // We have the tags
    res.send(body);
  }
};

module.exports = imageUpload;