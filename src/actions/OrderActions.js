
var Api = require('../helpers/Api');

module.exports = {
  createOrder: function(formData, token, imageName, fn){
    Api.purchase(formData, token, imageName, fn);
  }

};
