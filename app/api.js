const base = process.cwd()
const glob = require('glob')
const { resolve, relative, join, dirname, basename } = require('path')
const express = require('express')
const router = express.Router()

router.use(express.json())

glob.sync(resolve(base, 'server/api/**/*.js'))
  .map(file => {
    const relativepath = relative(join(base, 'server', 'api'), file)
    const apipath = join(dirname(relativepath), basename(relativepath, '.js'))

    router.use(`/api/${apipath}`, require(file))
  })

router.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  // If status code is 200
  // means no custom status code has been set
  // then force it to 400
  if (res.statusCode === 200) {
    res.status(400)
  }

  res.json({
    message: err.message
  })

  return res.end()
})

module.exports = router
