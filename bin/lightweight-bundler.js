#!/usr/bin/env node

const spawn = require('cross-spawn');

const args = process.argv.slice(2);
const script = args.shift();

switch (script) {
  case 'init':
  case 'build':
  case 'start':
    runScript(script, args)
    break;

  default:
    console.log(`Unknown script "${script}".`)
}

function runScript(script, args) {
  const scriptCommand = [require.resolve('../scripts/' + script), ...args]
  const result = spawn.sync(
    'node', 
    scriptCommand,
    { stdio: 'inherit' }
  )

  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
      )
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
      )
    }
    process.exit(1);
  }

  process.exit(result.status);
}
