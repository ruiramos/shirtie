var app        = require('express')(),
    bodyParser = require('body-parser'),
    multer     = require('multer');

// CORS Handling
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Parse body JSON in post requests
// app.use(bodyParser.json({limit:'50mb'}));

// Endpoints
app.get('/quotes', require('./routes/quotes'));
app.post('/upload', multer({ dest: './uploads/'}), require('./routes/upload'));

var server = app.listen(3000, function () {
  var address = server.address();
  console.log('Example app listening at http://%s:%s', address.host, address.port);
});