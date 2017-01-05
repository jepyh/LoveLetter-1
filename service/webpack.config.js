var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve('./dist/index.js'),
    filename: 'index.js'
  },
  module: {
    loaders: [{loader: 'babel-loader'}]
  },
  devtool: 'source-map',
  plugin: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
