const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    shared: './shared.js',
    front: './front.js',
    about: './about.js',
    content: './content.js',
    appartments: './appartments.js',
    singleAppartments: './single-appartments.js'
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
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'TweenLite': path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      'TweenMax': path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      'TimelineLite': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      'TimelineMax': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      'ScrollMagic': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    }
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
      template: './about.html',
      filename: 'about.html',
      chunks: ['about', 'shared']
    }),
    new HtmlWebpackPlugin({
      template: './content.html',
      filename: 'content.html',
      chunks: ['content', 'shared']
    }),
    new HtmlWebpackPlugin({
      template: './appartments.html',
      filename: 'appartments.html',
      chunks: ['appartments', 'shared']
    }), 
    new HtmlWebpackPlugin({
      template: './single-appartments.html',
      filename: 'single-appartments.html',
      chunks: ['singleAppartments', 'shared']
    })
    // new CleanWebpackPlugin(['dist'])
  ]
}
