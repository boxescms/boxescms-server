const fs = require('fs')
const path = require('path')
const base = process.cwd()
const chalk = require('chalk')

module.exports = () => {
  ;[
    'server',
    'server/api'
  ]
    .map(item => {
      const folder = path.join(base, item)

      try {
        fs.mkdirSync(folder)
        console.log(`${folder} ${chalk.green('created')}`)
      } catch (err) {
        console.error(`${folder} ${chalk.grey('skipped')}`)
      }
    })
}
