const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const chalk = require('chalk')
const base = process.cwd()

module.exports = (file = '.env.local', override) => {
  const envfile = path.join(base, file)

  if (!fs.existsSync(envfile)) {
    return console.error(`${envfile} not found.`)
  }

  let envcontent = fs.readFileSync(envfile, 'utf8')

  let appkey

  const searchAPPKEY = (/APP_KEY=(.*)\n/gm).exec(envcontent)

  if (override || searchAPPKEY === null || searchAPPKEY[1] === '') {
    appkey = crypto.randomBytes(32).toString('hex')

    if (searchAPPKEY === null) {
      envcontent = `APP_KEY=${appkey}\n` + envcontent
    }

    if (searchAPPKEY && (searchAPPKEY[1] === '' || override)) {
      envcontent = envcontent.replace(/APP_KEY=(.*)\n/gm, `APP_KEY=${appkey}\n`)
    }

    fs.writeFileSync(envfile, envcontent, 'utf8')

    return appkey
  }

  console.log(chalk.red('Unable to generate App Key.'))
}
