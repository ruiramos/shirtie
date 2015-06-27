
var request = require('superagent');

var host = 'http://localhost:3000';

module.exports = {
  postImage: function(image, callback){
    request.post(host + '/upload')
      .send({image: image})
      .end(callback);
  }
};