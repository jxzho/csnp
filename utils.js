const fs = require('fs')
const path = require('path')
const util = require('util')
const mkdir = util.promisify(fs.mkdir)
const { lightYellow, lightGreen, lightRed } = require('kolorist')

const writeContents = (currentPath, contents) => {
  const parsed = path.parse(currentPath)
  const { dir } = parsed
  return new Promise((resolve, reject) => {
    mkdir(dir, { recursive: true }).then(() => {
      fs.writeFile(currentPath, contents, 'utf-8', (err) => {
        if (!err) {
          resolve({
            parsed,
            contents
          })
        } else {
          reject(err)
        }
      })
    })
  })
  
}

module.exports = {
  log: {
    info: (...args) => {
      return console.log.apply(null, args.map(lightYellow))
    },
    success: (...args) => {
      return console.log.apply(null, args.map(lightGreen))
    },
    error: (...args) => {
      return console.log.apply(null, args.map(lightRed))
    }
  },
  writeContents
}
