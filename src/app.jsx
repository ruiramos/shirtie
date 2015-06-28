var React = require('react'),
    App = require('./components/App.jsx').App;

window.React = React;
window.host = (window.location.host.indexOf('localhost')>=0) ? 'http://localhost:3210' : 'http://www.shirtie.co:3210';

React.render(<App />, document.body);