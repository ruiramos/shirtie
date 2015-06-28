
var request = require('request'),
    config   = require('../config.json');

var ConfirmOrder = function(req, res, next){

var orderObject = {
  "shipping_address": {
      "recipient_name": "Deon Botha",
      "address_line_1": "Eastcastle House",
      "address_line_2": "27-28 Eastcastle Street",
      "city": "London",
      "county_state": "Greater London",
      "postcode": "W1W 8DH",
      "country_code": "GBR"
    },
    "customer_email": "deon@kite.ly",
    "customer_phone": "+44 (0)784297 1234",
    "jobs": [{
      "options": {
        "garment_size": "M",
        "garment_color": "white"
      },
      "assets": {
        "center_chest": "http://psps.s3.amazonaws.com/sdk_static/1.jpg",
        "center_back": "http://psps.s3.amazonaws.com/sdk_static/2.jpg"
      },
      "template_id": "gildan_tshirt"
    }]
  };

var requestOptions = {
  uri: 'https://api.kite.ly/v1.4/print/',
  headers: {
    'Authorization': 'ApiKey ' + config.kite_test_key + ':' + config.kite_test_secret
  },
  json: true,
  body: orderObject
}

request.get(requestOptions, function(err, res){
  console.log('order placed', err, res.body);
})

}

module.exports = ConfirmOrder;

/*

    "shipping_address": {
      "recipient_name": "Deon Botha",
      "address_line_1": "Eastcastle House",
      "address_line_2": "27-28 Eastcastle Street",
      "city": "London",
      "county_state": "Greater London",
      "postcode": "W1W 8DH",
      "country_code": "GBR"
    },
    "customer_email": "deon@kite.ly",
    "customer_phone": "+44 (0)784297 1234",
    "jobs": [{
      "options": {
        "garment_size": "M",
        "garment_color": "white"
      },
      "assets": {
        "center_chest": "http://psps.s3.amazonaws.com/sdk_static/1.jpg",
        "center_back": "http://psps.s3.amazonaws.com/sdk_static/2.jpg"
      },
      "template_id": "gildan_tshirt"
    }]
  }'


*/