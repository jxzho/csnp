const fs = require('fs')
const matter = require('gray-matter')

const { writeContents } = require('./write-contents')

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
  if (fs.existsSync(snpPath)) {
    return Promise.resolve({
      flag: false,
      message: `${snpPath} file already exists!`
    })
  }

  return writeContents(
    snpPath,
    matter.stringify(body, data)
  ).then(({ contents }) => {
    return {
      flag: true,
      contents
    }
  })
}

module.exports = {
  createCsnpLocal
}
