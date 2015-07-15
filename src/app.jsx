var React = require('react'),
    App = require('./components/App.jsx').App,
    Snap = require('./components/Snap.jsx').Snap,
    page = require('page'),
    sc = require('socketcluster-client/index');

window.React = React;
window.host = (window.location.host.indexOf('localhost')!==-1) ? 'http://localhost:3210' : 'http://www.shirtie.co:3210';

var routes = {};

routes.index = function(){
  React.render(<App contentView={Snap} />, document.body);
}

page('/', routes.index);
page();

var options = {
    port: 3210
};

// Initiate the connection to the server
var socket = sc.connect(options);
socket.on('connect', function () {
    console.log('CONNECTED!');
});

// Listen to an event called 'rand' from the server
socket.on('rand', function (num) {
    console.log('RANDOM: ' + num);
    var curHTML = document.body.innerHTML;
    curHTML += 'RANDOM: ' + num + '<br />';
    document.body.innerHTML = curHTML;
});

socket.on('pong', (data) => {console.log('got pong!:', data)})