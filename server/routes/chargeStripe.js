
var config = require('../config'),
    stripe = require('stripe')(config.stripe_test_key);

var ChargeStripe = function(req, res, next){
  var t = req.body.token;
  var form = req.body.formData;
  console.log(req.body);
  var ammount;

  form.forEach(function(field){
    if(field.name === 'type'){
      if(field.value === 'tshirt'){
        ammount = 990;
      } else {
        ammount = 1290;
      }
    } else if(field.name === 'email'){
      email = field.value;
    }
  })

  stripe.charges.create({
    amount: ammount,
    currency: "gbp",
    source: t, // obtained with Stripe.js
    description: "Shirtie charge for "+email
  }, function(err, charge) {
    console.log('stripe returned', err, charge);
    next();
  });

};

module.exports = ChargeStripe;

