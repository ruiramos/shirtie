var app        = require('express')(),
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

// Parse body JSON in post requests
// app.use(bodyParser.json({limit:'50mb'}));

// Endpoints
app.get('/quotes', require('./routes/quotes'));
app.post('/upload',
  multer({ dest: './uploads/'}),
  require('./routes/upload'),
  require('./routes/quotes'),
  function(req, res, next){
    console.log('using quote:', req.query.quote);

    ImageGenerator.generateImage(req.query.imageName, req.query.quote, function(err, finalImage){
      req.query.art = finalImage;
      next();
    });

  },
  require('./routes/kitely'),
  function(req, res){ res.send({error: null, art: req.query.art.publicUri}) }
  );

app.get('/kitely',
  function(req, res, next){
    req.query = {
      art: {
        fullPath: '/Volumes/Work/server/projects/shirtie/uploads/test_final.jpg'
      }
    };
    next();
  },
  require('./routes/kitely'),
  function(req, res){ res.send({error: null, art: req.query.art.publicUri}) }
  )

var server = app.listen(3000, function () {
  var address = server.address();
  console.log('Example app listening at http://%s:%s', address.host, address.port);
});