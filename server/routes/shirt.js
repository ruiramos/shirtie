var request  = require('request'),
    qs       = require('querystring'),
    config   = require('../config.json'),
    fs       = require('fs'),
    path     = require('path');

module.exports = function(req, res, next){
  var route = 'http://www.zazzle.com/api/create/at-238831147151297992?rf=238831147151297992&ax=Linkover&pd=256047286723869927&fwd=ProductPage&ed=true&tc=&ic=&t_image_iid=';
  // Fake image, for now
  var img = 'http://pbs.twimg.com/profile_images/1079908235/borat_855_18535194_0_0_12672_300_400x400.jpg';

  request.get(route + encodeURIComponent(img), function(error, response, body){
  res.send(body);
  // next();
 });
};