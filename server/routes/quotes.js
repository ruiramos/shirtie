var request = require('request'),
    qs      = require('querystring'),
    config  = require('../config.json');

var defaultTags = [/*'funny'*/];

// Get awesome quotes (endpoint handler)
var getQuotes = function(req, res, next){
  var options = {
    uri: 'https://api.import.io/store/data/51f15248-0763-4114-8c2f-36dc99fc8f8c/_query',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    qs: {
      _user:   config.import_user,
      _apikey: config.import_key
    },
    json: {
      input: {
        'webpage/url': config.import_url + defaultTags.concat(req.query.q.split(' ')).join('+')
      }
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body.results.map(function(result){
        return {
          quote: result['bqquotelink_link/_text'],
          by:    result['kennybaker_link/_text']
        };
      }));
    }
  });
};

module.exports = getQuotes;