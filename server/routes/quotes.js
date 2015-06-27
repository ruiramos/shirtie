var request = require('request'),
    qs      = require('querystring'),
    config  = require('../config.json');

var defaultTags = [/*'funny'*/];

function _selectQuote(quotes){
  // @todo
  return quotes[Math.floor(quotes.length * Math.random())];
}

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
      console.log('QUOTE', body, req.query);
      var quotes =body.results
          // map quote data
          .map(function(result){
            return {
              quote: result['bqquotelink_link/_text'],
              by:    result['kennybaker_link/_text']
            };
          })

          // Filter quotes by length
          .filter(function(quote){
            return quote.quote && quote.quote.length;
          })

        req.query.quote = _selectQuote(quotes);
        next();
    }
  });
};

module.exports = getQuotes;