module.exports.run = function (worker) {
  console.log('   >> Worker PID:', process.pid);

  var scServer = worker.scServer;

  /*
    In here we handle our incoming realtime connections and listen for events.
  */
  scServer.on('connection', function (socket) {
    socket.emit('pong', Math.random(), function(err){
      console.log('error is', err);
    });
  });

}
