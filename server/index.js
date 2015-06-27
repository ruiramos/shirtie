var app = require('express')(),
    bodyParser = require('body-parser');

// CORS Handling
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Parse body in post requests
app.use(bodyParser);

// Endpoints
app.get('/quotes', require('./routes/quotes'));
app.post('/upload', require('./routes/upload'));

var server = app.listen(3000, function () {
  var address = server.address();
  console.log('Example app listening at http://%s:%s', address.host, address.port);
});