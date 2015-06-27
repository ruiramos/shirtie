var React = require('react'),
    App = require('./components/App.jsx').App;

window.React = React;

// Webpack refresh thing

if(document.location.host.indexOf('localhost') === 0){
  var js = document.createElement("script");
  js.type = "text/javascript";
  js.src = "http://localhost:8080/webpack-dev-server.js";
  document.head.appendChild(js);
}

// ----

React.render(<App />, document.body);