const cssvariables = require('postcss-css-variables')
const flexbugsfixes = require('postcss-flexbugs-fixes')
const nested = require('postcss-nested')
const calc = require('postcss-calc')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = function(context) {
  let plugins= []

  if(context.options.sugared) {
    plugins.concat([
      nested(),
      cssvariables(),
      calc(),
    ])
  }
  
  plugins.concat([
    flexbugsfixes(),
    autoprefixer({
      browsers: require('./browserslist.config')
    }),
  ])

  if(context.env === 'production') {
    plugins.concat([
      cssnano()
    ])
  }

  return {
    plugins
  }
}