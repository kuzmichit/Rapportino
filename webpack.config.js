/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development'; // По умолчанию режим development
if (process.env.NODE_ENV === 'production') { // Режим production, если 
// при запуске вебпака было указано --mode=production
  mode = 'production';
}

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },

  devtool: 'eval-cheap-source-map',
  mode,

  devServer: {
    hot: false, //!!!
    port: 3000,
    liveReload: true, // !!!

    open: {
      app: {
        name: 'firefox',
        arguments: ['--incognito', '--new-window'],
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin( {
      template: './src/index.html'
    } ),

    new MiniCssExtractPlugin( {
      filename: '[name].[contenthash].css', // Формат имени файла
    } ),
 
  ],
  module: {
    rules: [
      { test: /\.(html)$/,
        use: ['html-loader'] 
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
};