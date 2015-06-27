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

    var r = request(options, handleTags);
  });

  function handleTags(err, response, body) {
    body = JSON.parse(body);

    // Select a tag (has to be improved)
    var tags = [
      body.results[0].result.tag.classes[0]
    ];

    console.log('USE TAGS: ', tags.join(', '));

    // Assign tags to query
    req.query = {
      q:tags.join(' ')
    };

    req.query.imageName = image.name;

    next();

    // res.set('Content-Type','application/json');
    // res.send(body.results[0].result.tag);
  }
};

module.exports = imageUpload;