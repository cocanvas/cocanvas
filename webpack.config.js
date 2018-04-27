const path = require('path');
const webpack = require('webpack');

// entry point and output
module.exports = {
  // use source map but seperate map from bundle
  devtool: 'source-map',
  entry: ['./src/main.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  // production build
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
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: true,
    openPage: ''
  }
};
