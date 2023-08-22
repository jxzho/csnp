const fs = require('fs')
const path = require('path')
const util = require('util')
const mkdir = util.promisify(fs.mkdir)

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
  writeContents
}
