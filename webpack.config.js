const path = require('path');
const webpack = require('webpack');

// webpack config requires entry point and output
module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: [/node_modules/,'/public/']
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: true,
    openPage: ''
  }
};
