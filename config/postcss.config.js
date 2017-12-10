const cssvariables = require('postcss-css-variables')
const flexbugsfixes = require('postcss-flexbugs-fixes')
const nested = require('postcss-nested')
const calc = require('postcss-calc')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = function(context) {
  let plugins = []

  if(context.options.sugared) {
    plugins.push(nested())
    plugins.push(cssvariables())
    plugins.push(calc())
  }
  

  plugins.push(flexbugsfixes())
  plugins.push(autoprefixer({
    browsers: require('./browserslist.config')
  }))

  if(context.env === 'production') {
    plugins.push(cssnano())
  }

  return {
    plugins
  }
}