var SocketCluster = require('socketcluster').SocketCluster;
var socketCluster = new SocketCluster({
  balancers: 1, // Number of loadbalancer processes to launch
  workers: 1, // Number of worker processes
  stores: 1, // Number of store processes
  port: 3210, // The port number on which your server should listen
  appName: 'shirtie', // A unique name for your app

  /* A JS file which you can use to configure each of your
   * workers/servers - This is where most of your backend code should go
   */
  workerController: __dirname + '/worker.js',

  /* JS file which you can use to configure each of your
   * stores - Useful for scaling horizontally across multiple machines (optional)
   */
  storeController: __dirname + '/store.js',

  /* Maximum number of events a single socket can be subscribed to
   * (security feature, optional, defaults to 100)
   */
  socketEventLimit: 100,

  // Whether or not to reboot the worker in case it crashes (defaults to true)
  rebootWorkerOnCrash: true
});