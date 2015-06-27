var request  = require('request'),
    config   = require('../config.json'),
    fs = require('fs'),
     tunnel = require('tunnel');

var tunnelingAgent = tunnel.httpsOverHttp({
  ca: [ fs.readFileSync('/Users/rui/Desktop/charles-ssl-proxying-certificate.crt')],
  proxy: {
    host: 'localhost',
    port: 8888 // default Charles proxy port
  }
});

var assetUploadUrl = 'https://api.kite.ly/v1.4/asset/sign';

var uploadArt = function(req, res, next){
console.log('oi', req.query.art);

  request({
    uri: assetUploadUrl,
    qs: {
      mime_types: 'image/jpeg',
      client_asset: 'true'
    },
    json: true,
    method: 'GET',
    headers: {
      'Authorization': 'ApiKey ' + config.kite_test_key + ':' + config.kite_test_secret
    }
  }, function(err, res){
    var signedAmazonUrl = res.body.signed_requests[0];
    var s3Url = res.body.urls[0];

    console.log('sending request to ', signedAmazonUrl)

    request.put({
      uri: signedAmazonUrl,
      agent: tunnelingAgent,
      headers: {
        'content-type': 'image/jpeg',
        'x-amz-acl': 'private'
      },
      formData: {
        image: fs.createReadStream(req.query.art.fullPath)
      }
    }, function(err_, res_){
      console.log('uploaded it to amazon', s3Url);
      next();
    })

  })



}

module.exports = uploadArt;