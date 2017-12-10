process.on('unhandledRejection', err => {
  throw err;
});
// Handle errors here

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const appPath = path.resolve('.')
const ownPath = path.resolve(path.join(__dirname, '..'))

start(appPath, ownPath);

function start (appPath, ownPath) {

  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server')
  const webpackConfig = require(path.join(ownPath, 'config', 'webpack.config.js'))
  const open = require('opn')
  const url = require('url')

  const isInteractive = require('../utils/isInteractive')
  const clearConsole = require('../utils/clearConsole')
  const formatWebpackOutput = require('../utils/formatWebpackOutput')
  
  let compiler
  
  try {
    compiler = webpack(webpackConfig)
  } catch (err) {
    console.log(chalk.red('Failed to compile.'))
    console.log()
    console.log(err.message || err)
    console.log()
    process.exit(1)
  }

  compiler.plugin('invalid', () => {
    if (isInteractive) {
      clearConsole()
    }
    console.log('Compiling...')
  });

  compiler.plugin('done', stats => {
    if (isInteractive) {
      clearConsole()
    }

    formatWebpackOutput(stats)
  });

  let devServer = new WebpackDevServer(compiler, webpackConfig.devServer)
  const devServerUrl = url.format({
    protocol: webpackConfig.devServer.https ? 'https' : 'http',
    hostname: webpackConfig.devServer.host === '0.0.0.0' ? 'localhost' : webpackConfig.devServer.host,
    port: webpackConfig.devServer.port,
    pathname: '/',
  });

  devServer.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, (err, stats) => {
    if (err) {
      return console.log(err)
    }
    if (isInteractive) {
      clearConsole()
    }
    console.log(chalk.cyan('Starting the development server...\n'))
    open(devServerUrl)
  });

  const close = function close () {
    devServer.close()
    process.exit()
  }

  process.on('SIGINT', close)
  process.on('SIGTERM', close)

}
