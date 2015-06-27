
var request = require('superagent');

var host = 'http://localhost:3000';

module.exports = {
  postImage: function(image, callback){
    request.post(host + '/upload')
      .send({image: image})
      .end(callback);
  },

  postMultipartImage: function(image, callback){
    var reader = new FileReader();

    reader.onloadend = function () {

      request.post('/upload')
        .attach(reader.result, 'image.png')
        .end(callback);
    }

    reader.readAsBinaryString(image);
  }
};