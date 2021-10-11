const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  mode: 'development',
  module: {
    rules: [
      {test: /\.jsx?/, exclude: [/node_modules/], use: [{loader: 'babel-loader', options: {presets: ['@babel/env', '@babel/react']}}]},
      {test: /\.css$/i, use: ['style-loader', 'css-loader']},     
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    compress: true,
    hot: true,
    historyApiFallback: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000/',
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};