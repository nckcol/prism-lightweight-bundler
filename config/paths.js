const path = require('path')
const fs = require('fs')

const root = fs.realpathSync(process.cwd())
const modules = path.resolve(root, 'node_modules')
const build = path.resolve(root, 'build')
const public = path.resolve(root, 'public')
const env = path.resolve(root, '.env')
const source = path.resolve(root, 'src')
const pages = path.resolve(source, 'pages')
const static = path.resolve(source, 'static')

const bundler = path.resolve(__dirname, '..')
const babelrc = path.resolve(bundler, '.babelrc')
const browserlistsrc = path.resolve(bundler, '.browserlistsrc')
const eslintrc = path.resolve(bundler, '.eslintrc')
const stylelintrc = path.resolve(bundler, '.stylelintrc')
const postcssConfig = path.resolve(bundler, 'postcss.config.js')

module.exports = {
  root,
  modules,
  build,
  public,
  env,
  source,
  pages,
  static,
  bundler: {
    root: bundler,
    babelrc,
    browserlistsrc,
    eslintrc,
    stylelintrc,
    postcssConfig
  }
};