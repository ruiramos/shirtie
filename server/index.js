var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    multer     = require('multer'),
    path       = require('path'),
    ImageGenerator = require('./controllers/imageGenerator');

// CORS Handling
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

// Endpoints
app.get('/quotes', require('./routes/quotes'));

app.post('/upload',
  multer({
    dest: './server/uploads/',
    limits: {fieldSize: 100},
  }),
  require('./routes/upload'),
  require('./routes/quotes'),
  function(req, res, next){
    if (!query.quote) {
      res.status(500);
      return res.send({error:'No inspiration was found...'});
    }

    ImageGenerator.generateImage(req.query.imageName, req.query.quote, function(err, finalImage){
      req.query.art = finalImage;
      next();
    });

  },
  function(req, res){
    res.send({
      error: null,
      imageName: req.query.art.imageName,
      imagePath: req.query.art.publicUri
    })
    }
  );

app.post('/place', require('./routes/createAsset'), require('./routes/confirmOrder'))

app.get('*', function(req, res){ res.sendFile(path.resolve(__dirname, '../index.html')); });



var server = app.listen(3000, function () {
  var address = server.address();
  console.log('Example app listening at http://%s:%s', address.host, address.port);
});