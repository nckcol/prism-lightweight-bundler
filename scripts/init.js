process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const appPath = path.resolve('.')
const ownPath = path.resolve(path.join(__dirname, '..'))

init(appPath, ownPath);

function init (appPath, ownPath) {

  const appPakagePath = path.join(appPath, 'package.json')
  const appPackage = require(appPakagePath);

  appPackage.scripts = {
    start: 'lightweight-bundler start',
    build: 'lightweight-bundler build'
  }
  fs.writeFileSync(appPakagePath, JSON.stringify(appPackage, null, 2))

  // Copy template files
  const templatePath = path.join(ownPath, 'template')

  fs.copySync(templatePath, appPath)

  const templateIgnore = path.join(appPath, 'gitignore')
  const appIgnore = path.join(appPath, '.gitignore')
  
  // Append ignored files into template gitignore if .gitignore exists 
  // in target directory
  if (fs.existsSync(appIgnore)) {
    const data = fs.readFileSync(appIgnore)
    fs.appendFileSync(templateIgnore, data)
    fs.unlinkSync(appIgnore)
  }

  // Rename gitignore to prevent npm from renaming it to .npmignore
  fs.move(templateIgnore, appIgnore)

  successLog()
};

function successLog () {

  const text = [
    ,
    chalk.green(`Successfuly inited file structure!`),
    ,
    'Available commands:',
    chalk.cyan(`  npm start`),
    '    Starts the development server.',
    ,
    `  npm build`,
    '    Builds project.',
    ,
  ]

  console.log(text.join('\n'))
}