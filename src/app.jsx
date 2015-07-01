var React = require('react'),
    App = require('./components/App.jsx').App,
    Snap = require('./components/Snap.jsx').Snap,
    page = require('page');

window.React = React;
window.host = (window.location.host.indexOf('localhost')!==-1) ? 'http://localhost:3210' : 'http://www.shirtie.co:3210';

var routes = {};

routes.index = function(){
  React.render(<App contentView={Snap} />, document.body);
}

page('/', routes.index);
page();