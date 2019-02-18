const fs = require('fs')
const path = require('path')
const base = process.cwd()
const chalk = require('chalk')

module.exports = () => {
  ;[
    {
      src: 'knexfile.js',
      dest: ['knexfile.js']
    },
    {
      src: 'project.gitlab-ci.yml',
      dest: ['.gitlab-ci.yml']
    },
    {
      src: 'project.env.example',
      dest: ['.env.example', '.env.local']
    },
    {
      src: 'project.editorconfig',
      dest: ['.editorconfig']
    },
    {
      src: 'project.gitignore',
      dest: ['.gitignore']
    }
  ]
    .map(item => {
      item.dest.map(d => {
        try {
          const target = path.join(base, d)
          if (fs.existsSync(target)) {
            console.log(`${base}/${d} ${chalk.gray('skipped')}`)
          } else {
            fs.copyFileSync(path.resolve(__dirname, '../../initfiles/' + item.src), target)
            console.log(`${base}/${d} ${chalk.green('copied')}`)
          }
        } catch (err) {
          console.error(`${base}/${d} ${chalk.red('error')}`)
        }
      })
    })
}
