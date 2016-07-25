var path = require('path')  
var webpack = require('webpack')  
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {  
  context: __dirname,
  entry: { main: ['./src/js/index.tsx'] },
  output: {
    path: path.resolve('./bundles'),
    publicPath: '/bundles/',  // Used by webpack-dev-server
    // or '[name]-[hash].js' if you can dynamically load JS, so you don't have to always invalidate cache.
    filename: '[name].js'
  },
  devtool: 'source-map',  // for debugging

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'})
  ],

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ],

    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.ts', '.tsx']
  }
}