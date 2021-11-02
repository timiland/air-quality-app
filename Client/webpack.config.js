const isDevelopment = process.env.NODE_ENV === 'development'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: ' index_bundle.js',
  },
  module: {
    rules: [
        {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use:['babel-loader']
        },
        {
          test: /\.(svg)$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                esModule: false,
                limit: 10 * 1024,
                name: '[name].[ext]',
                outputPath: 'images/',
                publicPath: 'images/',
                noquotes: true,
              },
            }
          ]
        }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   generateStatsFile: true,
    //   statsOptions: { source: false }
    // }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ],
};