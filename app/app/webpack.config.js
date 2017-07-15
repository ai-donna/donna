var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'babel-loader!wc-loader?minify=true',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'eval-source-map'
}
