var webpack = require("webpack");

module.exports = {
  cache: true,
  entry: ['webpack/hot/dev-server', './src/app.js'],
  //entry: ['./src/app.jsx'],
  output: {
    path: __dirname + '/dist/',
    publicPath: '/dist/',
    filename: "bundle.js",
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.jsx$/, loaders: ['babel'], exclude: /node_modules/},
      {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  node: {
    fs: "empty"
  }
};