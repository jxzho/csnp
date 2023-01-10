const fs = require('fs')
const os = require('os')
const path = require('path')
const matter = require('gray-matter')
const JSON = require('comment-json')

const { log } = require('./utils')

const DIR = 'csnp'

const getTargetPath = (name) => path.join(os.homedir(), '/Library/Application Support/Code/User/snippets', `${name}.code-snippets`)

try {
  const paths = fs.readdirSync(DIR, 'utf-8')
  paths.forEach((pathname) => {
    const fullpath = path.join(DIR, pathname)

    if (fs.statSync(fullpath).isDirectory()) {

      let snippetsOrigin
      const targetFilePath = getTargetPath(pathname)
      if (fs.existsSync(targetFilePath)) {
        snippetsOrigin = fs.readFileSync(targetFilePath, 'utf-8')
      }

      const parsed = snippetsOrigin ? JSON.parse(snippetsOrigin) : {}
      const map = new Map(Object.entries(parsed))

      fs.readdirSync(fullpath, 'utf-8').forEach(filename => {
        const str = fs.readFileSync(path.join(fullpath, filename), 'utf8')
        const { content: body, data: dataMatter } = matter(str)
        const { name, prefix, description } = dataMatter || {}

        let _valueMap
        if (map.has(name)) {
          _valueMap = map.get(name)
          map.delete(name)
        }
        map.set(name, {
          ..._valueMap,
          prefix,
          body: body.split('\n'),
          description
        })
      })

      const objFromMap = Object.fromEntries(map)

      const _map = snippetsOrigin ? JSON.assign(parsed, objFromMap, Object.keys(objFromMap)) : objFromMap

      const strs = JSON.stringify(_map, null, 2)

      log.info(targetFilePath, strs)

      fs.writeFile(targetFilePath, strs, (err) => {
        if (!err) {
          log.success('success')
        } else {
          log.error('set snippets error', err)
        }
      })

    }

  })

} catch (error) {
  log.error('[code execute error]', error)
  console.log('=>> error', error)
}
