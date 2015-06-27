module.exports = function(file, fn){
  return $.canvasResize(file, {
    width: 800,
    height: 0,
    crop: false,
    quality: 80,
    //rotate: 90,
    callback: fn
  });
};