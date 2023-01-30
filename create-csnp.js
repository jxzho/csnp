const path = require('path')
const fs = require('fs')
const util = require('util')
const matter = require('gray-matter')

const mkdir = util.promisify(fs.mkdir)

const createCsnp = (snpPath, data = {
  name: '',
  prefix: '',
  description: '',
  scope: ''
}) => {
  const strs = matter.stringify(`code snippets`, data)

  const makeCsnp = val => fs.writeFileSync(snpPath, val, 'utf-8')

  if (!fs.existsSync(snpPath)) {
    const { dir } = path.parse(snpPath)
    return mkdir(dir, { recursive: true }).then(() => {
      makeCsnp(strs)
      return true
    })
  }

  return Promise.resolve(false)
}

module.exports = {
  createCsnp
}
