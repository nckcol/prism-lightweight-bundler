const path = require('path')
const configUtils = require('webpack-config-utils')
const merge = require('webpack-merge')

const { 
  ifProduction, 
  ifNotProduction 
} = configUtils.getIfUtils(process.env.NODE_ENV || 'development')

const { removeEmpty } = configUtils

const paths = require('./paths')
/* const pages = [
  {
    template: './pages/index.html',
    minify: false
  }
] */
const host = 'loaclhost'
const port = '3000'

const config = {
  entry: {
    index: './index.js',
  },

  context: paths.source,

  output: {
    path: paths.build,
    
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js',
    publicPath: '',
  }
}

const baseConfig = require('./parts/webpack.base')
const scriptsConfig = require('./parts/webpack.scripts')
const stylesConfig = require('./parts/webpack.styles')

module.exports = merge(

  baseConfig(paths, host, port),

  config,

  scriptsConfig(paths),
  stylesConfig(paths)
)