
var request = require('request'),
    config   = require('../config.json');

  function _serializeForm(form){
    var ret = {};
    form.forEach(function(field){
      ret[field.name] = field.value;
    })
    return ret;
  }

var ConfirmOrder = function(req, res, next){
  var form = req.body.formData;
  var formObj = _serializeForm(form);

  console.log(formObj)

var orderObject = {
  "shipping_address": {
      "recipient_name": formObj.name,
      "address_line_1": formObj.address1,
      "address_line_2": formObj.address2,
      "city": formObj.city,
      "postcode": formObj.postcode,
      "country_code": "GBR"
    },
    "customer_email": formObj.email,
    "jobs": [{
      "options": {
        "garment_size": formObj.size,
        "garment_color": "white"
      },
      "assets": {
        "center_chest": req.query.assetUrl,
      },
      "template_id": (formObj.type === 'tshirt' ? "gildan_tshirt" : "gildan_hoodie")
    }]
  };

  console.log(orderObject, orderObject.jobs[0].assets.center_chest);

var requestOptions = {
  uri: 'https://api.kite.ly/v1.4/print/',
  headers: {
    'Authorization': 'ApiKey ' + config.kite_live_key + ':' + config.kite_live_secret
  },
  json: true,
  body: orderObject
}

request.get(requestOptions, function(err, res2){
  console.log('order placed', err, res2.body);
  if(!err)
    res.send({order_id: res2.body.print_order_id})
  else
    res.send(err);
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