var imageUpload = function(req, res, next){
  console.log(req.body);

  res.send('DONE!');
};

module.exports = imageUpload;