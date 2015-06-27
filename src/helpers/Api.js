
var request = require('superagent');

var host = 'http://localhost:3000';

module.exports = {
  postImage: function(image, callback){
    request.post(host + '/upload')
      .send({image: image})
      .end(callback);
  },

  postMultipartImage: function(image, callback){
    // var reader = new FileReader();

    // reader.onloadend = function () {
    //   request.post(host + '/upload')
    //     .attach(reader.result, 'image.png')
    //     .end(callback);
    // }

    // reader.readAsArrayBuffer(image);
    var data = new FormData();
    data.append('img', image);
    console.log(image);

    jQuery.ajax({
        url: host + '/upload',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
            console.log(data);
        }
    });
  }
};