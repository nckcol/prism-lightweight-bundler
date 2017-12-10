const webpack = require('webpack')
const configUtils = require('webpack-config-utils')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const { 
    ifProduction, 
    ifNotProduction 
} = configUtils.getIfUtils(process.env.NODE_ENV || 'development')

const { removeEmpty } = configUtils

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m'
  }
}

module.exports = function webpackBase (paths, host, port) {
  return {
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js'],
      modules: [
        paths.modules,
      ]
    },

    plugins: removeEmpty([

      // setting production environment will strip out
      // some of the development code from the app
      // and libraries
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      }),

      ifProduction(new MinifyPlugin()),

      new CopyPlugin([
        {
          from: paths.static,
          ignore: ['.*']
        }
      ]),

      // show module names instead of numbers in webpack stats
      ifNotProduction(new webpack.NamedModulesPlugin()),

      // don't spit out any errors in compiled assets
      ifNotProduction(new webpack.NoEmitOnErrorsPlugin()),
    ]),

    devtool: ifProduction(false, 'source-map'),

    performance: {
      maxAssetSize: 800 * 1024,
      maxEntrypointSize: 300 * 1024,
      hints: ifProduction('warning', false)
    },

    stats,

    devServer: {
      port,
      host,
      stats,
      
      contentBase: paths.source,
      publicPath: paths.public,
      historyApiFallback: true,
      compress: ifProduction(),
    },

    watchOptions: {
      aggregateTimeout: 300
    }
  }
}