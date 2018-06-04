const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    shared: './index.js',
    front: './front.js',
    woningen: './woningen.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }]
    }, {
      test: /\.(scss|sass|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader?name=[path]/[name].[ext]'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=[path]/[name].[ext]'
    }, {
      test: /\.(otf|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=[path][name].[ext]'
    }, {
      test: /\.twig$/,
      loader: 'twig-loader'
    }]
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './front.html',
      filename: 'front.html',
      chunks: ['front', 'shared']
    }), 
    new HtmlWebpackPlugin({
      template: './woningen.html',
      filename: 'woningen.html',
      chunks: ['woningen', 'shared']
    }),
    new CleanWebpackPlugin(['dist'])
  ]
}
