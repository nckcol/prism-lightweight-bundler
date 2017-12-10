const isInteractive = require('../utils/isInteractive')
const webpackFormatMessages = require('webpack-format-messages')
const chalk = require('chalk')

module.exports = function webpackOutput (stats) {
  const messages = webpackFormatMessages(stats)

  // If errors exist, only show errors.
  if (messages.errors.length) {
    errorOutput(messages.errors)
    return
  }

  // Show warnings if no errors were found.
  if (messages.warnings.length) {
    warningOutput(messages.warnings)
    return
  }

  console.log(chalk.green('Compiled successfully!'))
}

function errorOutput(messages) {
  // Only keep the first error. Others are often indicative
  // of the same problem, but confuse the reader with noise.
  console.log(chalk.red('Failed to compile.\n'))
  console.log(messages[0])
}

function warningOutput(messages) {
  console.log(chalk.yellow('Compiled with warnings.\n'))
  console.log(messages.join('\n\n'))
}