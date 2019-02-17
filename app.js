const express = require('express')
const app = express()
const { join } = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const base = process.cwd()
const userAppFile = join(base, 'app.js')

if (fs.existsSync(userAppFile)) {
  const userApp = require(userAppFile)

  if (typeof userApp.preinit === 'function') {
    userApp.preinit(app)
  }
}

app.use(require('compression')())
app.use(cookieParser())

app.use('/', require('./app/api'))
app.use('/', require('./app/routes'))

app.use((err, req, res, next) => {
  // TODO: Show error page
  res.status(404)
  res.write(err.message)
  res.end()
})

module.exports = app
