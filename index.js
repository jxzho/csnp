const fs = require('fs')
const os = require('os')
const path = require('path')
const matter = require('gray-matter')
const JSON = require('comment-json')

const DIR = 'csnp'
const targetFilePath = path.join(os.homedir(), '/Library/Application Support/Code/User/snippets', '1.code-snippets')

try {
  let data = {}

  if (fs.existsSync(targetFilePath)) {
    data = fs.readFileSync(targetFilePath, 'utf-8') || {}
  }

  const parsed = JSON.parse(data)

  const map = new Map(Object.entries(JSON.parse(data)))

  const dirCsnp = fs.readdirSync('csnp', 'utf-8')
  dirCsnp.forEach((filename) => {
    const str = fs.readFileSync(path.resolve(DIR, filename), 'utf8')
    
    const { content: body, data = {} } = matter(str)
    const { name, prefix, description } = data

    if (!map.has(name)) {
      map.set(name, {
        prefix,
        body: body.split('\n'),
        description
      })
    }
  })

  const objFromMap = Object.fromEntries(map)

  const _map = JSON.assign({}, parsed, Object.keys(objFromMap))

  const strs = JSON.stringify(_map, null, 2)

  fs.writeFile(targetFilePath, strs, (err) => {
    if (!err) {
      console.log('=>> success!')
    } else {
      console.log('=>> writeFile', err)
    }
  })

} catch (error) {
  console.log('exec error', error)
}
