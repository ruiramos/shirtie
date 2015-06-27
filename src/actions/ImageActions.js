
var Api = require('../helpers/Api');

module.exports = {
  postImage: function(image, fn){
    Api.postMultipartImage(image, fn);
  }

};
