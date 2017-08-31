const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './lib/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'ExtendedRequest',
    libraryTarget: 'commonjs-module',
  },
  //devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin()
  ]
};