const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

const env = process.env.NODE_ENV || 'local'

const envfile = path.join(process.cwd(), '.env.' + env)

if (fs.existsSync(envfile)) {
  dotenv.config({
    path: envfile
  })
}

const defaultfile = path.join(process.cwd(), '.env')

if (fs.existsSync(defaultfile)) {
  dotenv.config({
    path: defaultfile
  })
}
