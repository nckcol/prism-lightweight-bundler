process.on('unhandledRejection', err => {
  throw err;
});
// Handle errors here


const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const appPath = path.resolve('.')
const ownPath = path.resolve(path.join(__dirname, '..'))

build(appPath, ownPath);

function build (appPath, ownPath) {

  const webpack = require('webpack')
  const webpackConfig = require(path.join(ownPath, 'config', 'webpack.config.js'))

  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      
      console.error(stats.toString())

      process.exit(1)
    }
    // Done processing
    console.log(chalk.green('Successfuly bundled!'))
  })

}