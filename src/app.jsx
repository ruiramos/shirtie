var React = require('react'),
    App = require('./components/App.jsx').App;

window.React = React;
window.host = 'http://localhost:3000';

React.render(<App />, document.body);