
var request = require('superagent');

var host = 'http://192.168.88.209:3000';

module.exports = {
  postImage: function(image, callback){
    request.post(host + '/upload')
      .send({image: image})
      .end(callback);
  },

  postMultipartImage: function(image, callback){
    var data = new FormData();
    data.append('img', image);

    jQuery.ajax({
        url: host + '/upload',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
          callback(null, data);
        }
    });
  }
};