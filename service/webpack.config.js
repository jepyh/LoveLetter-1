'use strict'

var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  target: 'node',
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugin: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
