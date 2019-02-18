#!/usr/bin/env node
require('dotenv').config()
const chalk = require('chalk')
const yargs = require('yargs')
const crypto = require('crypto')
const prepareInitFolders = require('../helpers/inits/prepareInitFolders')
const prepareInitFiles = require('../helpers/inits/prepareInitFiles')
const overrideAppKey = require('../helpers/inits/overrideAppKey')
const overridePackageData = require('../helpers/inits/overridePackageData')

yargs // eslint-disable-line
  .command('init', 'initialises project', {}, argv => {
    require('../helpers/checkIsProjectFolder')

    // Prepare default folders

    console.log()
    console.log(chalk.yellow('Creating folders...'))
    console.log('-------------------')

    prepareInitFolders()

    // Prepare default files

    console.log()
    console.log(chalk.yellow('Copying default files...'))
    console.log('------------------------')

    prepareInitFiles()

    // Prepare package file overrides
    console.log()
    console.log(chalk.yellow('Preparing package.json overrides'))
    console.log('------------------------')

    overridePackageData()

    console.log()
    console.log(chalk.yellow('Updated package.json with default scripts'))

    // Prepare env content
    console.log()
    console.log(chalk.yellow('Preparing .env.local App Key'))
    console.log('------------------------')

    const appkey = overrideAppKey()

    if (appkey) {
      console.log(`** .env.local **`)
      console.log(`* APP_KEY has been initialised to: ${appkey}`)
      console.log('* Run `' + chalk.blue('boxes generateAppKey') + '` to regenerate a randomised app key.')
    }

    // Completed
    console.log()
    console.log('------------------------')
    console.log()

    console.log(chalk.green('Success!'))

    console.log()
    console.log(chalk.green('Boxes CMS - Server Component'))
    console.log('------------------------')

    console.log('* Update .env.local APP_PORT and DB_* if required.')

    console.log()
    console.log('** Start Server **')
    console.log('* Run `' + chalk.blue('npm start') + '` or `' + chalk.blue('yarn start') + '` to start the server.')
    console.log('* Run `' + chalk.blue('npm run watch') + '` or `' + chalk.blue('yarn watch') + '` to start the server with frontend in watch mode.')
    console.log('* Run `' + chalk.blue('npm start --inspect') + '` or `' + chalk.blue('yarn start --inspect') + '` to start only server in inspect mode.')
    console.log()
    console.log('* Run `' + chalk.blue('npm start --help') + '` or `' + chalk.blue('yarn start --help') + '` for more information.')
    console.log('---------')
    console.log()
  })
  .command('generateAppKey', 'generates a new App Key', params => {
    params.option('override', {
      desc: 'overrides .env.local (default) file with the new App Key'
    })
  }, argv => {
    if (!argv.override) {
      console.log()
      console.log('Copy the following line into the project .env file')
      console.log('--------------------------------------------------')
      console.log()

      console.log('APP_KEY=' + crypto.randomBytes(32).toString('hex'))
      console.log()

      return
    }

    const appkey = overrideAppKey(argv.override === true ? '.env.local' : argv.override)

    if (appkey) {
      console.log()
      console.log(`** ${argv.override === true ? '.env.local' : argv.override} **`)
      console.log(`* APP_KEY has been initialised to: ${chalk.green(appkey)}`)
      console.log()
    }
  })
  .command('start [mode]', 'starts server', params => {
    params.positional('mode', {
      desc: 'shortcut for modes',
      choices: ['dev'],
      type: 'string'
    })

    params.option('watch', {
      description: 'enable watch mode'
    })

    params.option('inspect', {
      description: 'enable inspect option'
    })
  }, argv => {
    if (argv.mode === 'dev') {
      if (!argv.inspect) {
        argv.inspect = true
      }

      if (!argv.watch) {
        argv.watch = true
      }
    }

    if (argv.inspect) {
      process.env.BOXES_INSPECTPORT = argv.inspect === true ? 9229 : argv.inspect
    }

    if (argv.watch) {
      console.log()
      console.log(chalk.grey('Watch Mode, starting watcher instances'))
      console.log()

      require('../helpers/watchers/server')()
    } else {
      require('../')
    }
  })
  .demandCommand(1, 'Command is required.')
  .help()
  .argv
