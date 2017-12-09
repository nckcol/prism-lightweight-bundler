const path = require('path')
const configUtils = require('webpack-config-utils')
const merge = require('webpack-merge')

const { 
  ifProduction, 
  ifNotProduction 
} = configUtils.getIfUtils(process.env.NODE_ENV || 'development')

const { removeEmpty } = configUtils

const paths = {
  source: path.join(__dirname, './src'),
  build: path.join(__dirname, './public'),
  modules: path.resolve(__dirname, 'node_modules')
}

const pages = [
  {
    template: './pages/index.html',
    minify: false
  }
]

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

const baseConfig = require('./webpack/base.config')
const scriptsConfig = require('./parts/webpack.scripts')
const stylesConfig = require('./parts/webpack.styles')

module.exports = merge(

  baseConfig(host, port, paths),

  config,

  scriptsConfig(),
  stylesPart()
)