var request  = require('request'),
    config   = require('../config.json'),
    fs = require('fs'),
    https = require('https'),
    url = require('url'),
    tunnel = require('tunnel');

// var tunnelingAgent = tunnel.httpsOverHttp({
//   ca: [ fs.readFileSync('/Users/rui/Desktop/charles-ssl-proxying-certificate.crt')],
//   proxy: {
//     host: 'localhost',
//     port: 8888 // default Charles proxy port
//   }
// });

var assetUploadUrl = 'https://api.kite.ly/v1.4/asset/sign';

var uploadArt = function(req, res, next){
  var imagePath = path.resolve(__dirname, '../uploads') + '/' + req.body.imagePath;

  console.log('uploading', imagePath)

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

    var options = {
      hostname: url.parse(signedAmazonUrl).host,
      path: url.parse(signedAmazonUrl).path,
      // agent: tunnelingAgent,
      port: 443,
      method: 'PUT',
      headers: {
        'content-type': 'image/jpeg',
        'x-amz-acl': 'private',
      }
    }

    var bufs = [];
    var stream = fs.createReadStream(imagePath);
    stream.on('data', function(d){ bufs.push(d); });
    stream.on('end', function(){
      var buf = Buffer.concat(bufs);

      options.headers['content-length'] = buf.length;

      var req = https.request(options, function(res) {
        //res.setEncoding('utf8');
        console.log(err, 'uploaded it to amazon', s3Url);
        next();
      });

      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });

      // write data to request body
      req.write(buf);
      req.end();
    });

  })

}

module.exports = uploadArt;