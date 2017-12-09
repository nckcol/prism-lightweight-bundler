const cssvariables = require('postcss-css-variables')
const nested = require('postcss-nested')
const calc = require('postcss-calc')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    nested(),
    cssvariables(),
    calc(),
    autoprefixer(),
    cssnano()
  ]
}