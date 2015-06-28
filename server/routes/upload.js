var request  = require('request'),
    qs       = require('querystring'),
    config   = require('../config.json'),
    fs       = require('fs'),
    path     = require('path'),
    imageCtrl= require('../controllers/imageGenerator');

// List of black-listed meaningless tags
var exclude = ['black and white', 'isolated', 'adult', 'portrait','adult'];

var imageUpload = function(req, res, next){
  console.log('entering quotes');

  var image = req.files.img;

  var options = {
    uri: 'https://api.clarifai.com/v1/tag/',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + config.clarifai_token
    }
  };

  // Resize image
  // var stream = fs.createWriteStream(path.resolve(__dirname, "../../uploads/" + image.name.split('.')[0] + '_r.' + image.extension));

  // Pipe the resized image
  imageCtrl.getResizedImage(image.name, function(){
    options.formData = {
      "encoded_data": fs.createReadStream(path.resolve(__dirname, "../uploads/" + image.name.split('.')[0]+ '_resize.' + image.extension))
    };

    var r = request(options, handleTags);

  });

  function handleTags(err, response, body) {
    console.log(err, body);
    if (!body || err) return res.send('Error');

    var results = JSON.parse(body).results;
    // console.log('TAGS', results[0].result.tag);
    // Select a tag (has to be improved)
    var tags = [
      results[0].result.tag.classes[0],
      results[0].result.tag.classes[1]
    ];

    // Assign tags to query
    req.query = {
      q:tags.join(' ')
    };

    req.query.imageName = image.name;

    next();
  }
};

module.exports = imageUpload;