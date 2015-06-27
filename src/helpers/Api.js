
var request = require('superagent');

module.exports = {
  postImage: function(image, callback){
    request.post('/upload')
      .type('png')
      .send(image)
      .end(callback);
  }
}