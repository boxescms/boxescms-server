#!/usr/bin/env node
require('dotenv').config()
const chalk = require('chalk')

const argv = require('yargs')
  .option('watch', {
    description: 'enable watch mode'
  })
  .option('inspect', {
    description: 'enable inspect option'
  })
  .argv

if (argv.inspect) {
  process.env.BOXES_INSPECTPORT = program.inspect === true ? 9229 : program.inspect
}

if (argv.watch) {
  console.log()
  console.log(chalk.grey('Watch Mode, starting watcher instances'))
  console.log()

  return require('../helpers/watchers/server')()
}

require('../')
