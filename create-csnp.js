const path = require('path')
const fs = require('fs')
const util = require('util')
const matter = require('gray-matter')

const mkdir = util.promisify(fs.mkdir)

const createCsnpLocal = (
  snpPath,
  data = {
    name: '',
    prefix: '',
    description: '',
    scope: '',
  },
  body = 'code snippets'
) => {
  const strs = matter.stringify(body, data)

  const makeCsnp = (val) => fs.writeFileSync(snpPath, val, 'utf-8')

  if (fs.existsSync(snpPath)) {
    return Promise.resolve({
      flag: false,
      message: `${snpPath} file already exists!`
    })
  }

  const { dir } = path.parse(snpPath)
  return mkdir(dir, { recursive: true }).then(() => {
    makeCsnp(strs)
    return {
      flag: true
    }
  })
}

module.exports = {
  createCsnpLocal
}
