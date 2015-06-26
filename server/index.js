var app = require('express')();

app.get('/quotes', require('./routes/quotes'));

var server = app.listen(3000, function () {
  var address = server.address();
  console.log('Example app listening at http://%s:%s', address.host, address.port);
});