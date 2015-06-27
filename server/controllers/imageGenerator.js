
var fs = require('fs'),
    gm = require('gm').subClass({imageMagick: true}),
    path = require('path'),
    exec = require('child_process').exec;

var dir = path.resolve(__dirname, '../../uploads') + '/' ;
    WIDTH = 600,
    fonts = [
      'Seravek-Light-Italic',
      'Noteworthy-Light',
      'MyriadPro-Cond',
      'MyriadPro-Semibold'
    ];

function _getCaptionName(img){
  return img.split('.')[0] + '_caption.gif';
}

function _getAuthorFileName(img){
  return img.split('.')[0] + '_author.gif';
}

function _getRandomFont(){
  return fonts[Math.floor(fonts.length * Math.random())];
}

var ImageGenerator = {
  getResizedStream: function(imgName, stream){
    gm(dir + imgName)
      .resize(600, 600)
      .stream()
      .pipe(stream);
  },

  generateImage: function(imgName, quoteObj){
    var marginBottom = 38,
        arr = imgName.split('.'),
        imgFileName = arr[0],
        ext = arr[1],
        quote = quoteObj.quote,
        author = quoteObj.by;


    ImageGenerator.generateLabel(quote, author, imgName, function(){
      gm(dir + imgName)
        .resize(WIDTH*.85, 600)
        .stream(function(err, stdout){
          gm(stdout).size({bufferStream: true}, function(err, size){
            this
              .gravity("Center")
              .extent(WIDTH, size.height + marginBottom)
              .stream(function(e, stdout2){
                gm(stdout2)
                  .append(dir + _getCaptionName(imgName))
                  .append(dir + _getAuthorFileName(imgName))
                  .write(dir + imgFileName +'_final.' + ext, function (err) {
                    console.log('done');

                    // clean up
                    exec('rm '+dir + _getCaptionName(imgName));
                    exec('rm '+dir + _getAuthorFileName(imgName));
                  });
              })
           });
        })
    })
  },

  generateLabel: function(text, author, imgName, callback){
    var quoteFile = dir + _getCaptionName(imgName),
        authorFile = dir + _getAuthorFileName(imgName);

    exec("convert -background white -fill black -gravity South -font "+ _getRandomFont() +" -pointsize 40 -size "+WIDTH+"x caption:'"+text+"' "+quoteFile,
        function (error, stdout, stderr) {
          exec("convert -background white -fill gray -gravity South -font Seravek-Light-Italic -pointsize 16 -size "+WIDTH+"x30 caption:'"+author+"' "+authorFile,
            function (error, stdout, stderr) {
              callback && callback();
            });
        }
    );

  }
}

module.exports = ImageGenerator;