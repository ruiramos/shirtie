var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    multer     = require('multer'),
    ImageGenerator = require('./controllers/imageGenerator');

// CORS Handling
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/uploads', express.static(__dirname + '/uploads'));

// Endpoints
app.get('/quotes', require('./routes/quotes'));
app.post('/upload',
  multer({ dest: './server/uploads/'}),
  require('./routes/upload'),
  require('./routes/quotes'),
  function(req, res, next){
    console.log('using quote:', req.query.quote);

    ImageGenerator.generateImage(req.query.imageName, req.query.quote, function(err, finalImage){
      req.query.art = finalImage;
      next();
    });

  },
  require('./routes/createAsset'),
  function(req, res){ res.send({error: null, art: req.query.art }) }
  );

app.get('/place', require('./routes/confirmOrder'))




var server = app.listen(3000, function () {
  var address = server.address();
  console.log('Example app listening at http://%s:%s', address.host, address.port);
});