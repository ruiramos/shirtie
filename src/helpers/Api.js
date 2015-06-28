
var request = require('superagent');

module.exports = {
  postImage: function(image, callback){
    request.post(window.host + '/upload')
      .send({image: image})
      .end(callback);
  },

  postMultipartImage: function(image, callback){
    var data = new FormData();
    data.append('img', image);

    jQuery.ajax({
        url: window.host + '/upload',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        timeout: 9999,
        success: function(data){
          callback(null, data);
        },
        error: function(error){
          callback(error);
        }
    });
  },

  purchase: function(formData, token, imageName, fn){
    console.log(formData, token, imageName);
    request.post(window.host + '/purchase')
      .send({token: token.id, formData: formData, imageName: imageName})
      .end(fn);
  }
};