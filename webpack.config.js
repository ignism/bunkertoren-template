const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({ browsers: 'last 2 versions' })
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.twig$/,
        loader: 'twig-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader?name=[path]/[name].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[path]/[name].[ext]'
      },
      {
        test: /\.(otf|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'page-front.html',
      chunks: ['pageFront', 'shared']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'page-about.html',
      chunks: ['pageAbout', 'shared']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'page-appartments.html',
      chunks: ['pageAppartments', 'shared']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'single-appartments.html',
      chunks: ['singleAppartments', 'shared']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'page-content.html',
      chunks: ['pageContent', 'shared']
    })
  ],
  context: path.resolve(__dirname, 'src'),
  entry: {
    shared: './shared.js',
    pageFront: './page-front.js',
    pageAbout: './page-about.js',
    pageAppartments: './page-appartments.js',
    singleAppartments: './single-appartments.js',
    pageContent: './page-content.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
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
  }
}
