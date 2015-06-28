var React = require('react'),
    App = require('./components/App.jsx').App;

window.React = React;
window.host = 'http://www.shirtie.co:3210';

React.render(<App />, document.body);