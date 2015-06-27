
var fs = require('fs'),
    gm = require('gm').subClass({imageMagick: true}),
    path = require('path');

var dir = path.resolve(__dirname, '../../uploads') + '/' ;

var ImageGenerator = {
  getResizedStream: function(imgName, fn){
    gm(dir + imgName)
      .resize(600, 600)
      .stream(fn);
    // .pipe(writeStream);
  },

  generateImage: function(imgName, quote, author){
    var marginBottom = 50,
        lineHeight = 40;

    gm(dir + imgName)
      .resize(600, 600)
      .size(function(err, size){
        gm(dir + imgName)
          .extent(size.width, size.height + marginBottom + lineHeight * 2)
          .font("Helvetica", 52)
          .stroke('#000')
          .strokeWidth(1)
          .drawText(20, size.height + marginBottom, quote)
          .font("Arial", 30)
          .drawText(20, size.height + marginBottom + lineHeight, author)
          .write(dir + 'new.png', function (err) {
            if (!err) console.log('done');
            else console.log(err)
          });
      })

  }
}

module.exports = ImageGenerator;