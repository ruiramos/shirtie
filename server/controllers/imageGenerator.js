
var fs = require('fs'),
    gm = require('./gm').subClass({imageMagick: true});

var ImageGenerator = {
  generateImage: function(imgPath, quote){

    gm(imgPath)
      .resize(600, 600)
      .extent(600, 800)
      .font("Helvetica.ttf", 12)
      .drawText(600, 20, "GMagick!")
      .write('/upload/new.png', function (err) {
        if (!err) console.log('done');
      });

  }
}

module.exports = ImageGenerator;