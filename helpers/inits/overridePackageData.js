const fs = require('fs')
const path = require('path')
const base = process.cwd()

module.exports = () => {
  const packageFile = path.join(base, 'package.json')

  if (!fs.existsSync(packageFile)) {
    return console.error(`${packageFile} not found.`)
  }

  const packageData = require(packageFile)

  packageData.scripts = Object.assign({}, {
    start: 'boxes start',
    watch: 'boxes start --watch',
    'lint:js': 'standard'
  }, packageData.scripts)

  if (!packageData.standard) {
    packageData.standard = {
      parser: 'babel-eslint'
    }
  }

  fs.writeFileSync(packageFile, JSON.stringify(packageData, null, 2))
}
