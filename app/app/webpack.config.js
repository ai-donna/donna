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
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      },
    ],
  },
  // if you want to provide globals
  // resolve: {
  //   alias: {
  //     'extTestModule': path.resolve(__dirname, './components/test.js')
  //   }
  // },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     "extTestModule": "extTestModule",
  //   })
  // ],
  devServer: {
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
  },
  devtool: 'eval-source-map'
}
