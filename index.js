const fs = require('fs')
const path = require('path')
const JSON = require('comment-json')
const matter = require('gray-matter')

const { log } = require('./utils')
const { getSnippetFromVSC } = require('./snippet-vsc')

const DIR_CSNP = 'csnp'

const csnpTypes = () => fs.readdirSync(path.join(__dirname, DIR_CSNP), 'utf-8')

const isDir = val => fs.statSync(val).isDirectory()

try {
  // const execFiles = process.argv.slice(2)
  // const execModeDefault = execFiles.length > 0

  csnpTypes().forEach((type) => {
    const typePath = path.join(__dirname, DIR_CSNP, type)

    if (isDir(typePath)) {
      const {
        snippetMap,
        snippetsOrigin,
        snippetParsed,
        targetFilePath
      } = getSnippetFromVSC(type)

      fs.readdirSync(typePath, 'utf-8').forEach(csnp => {
        const csnpPath = path.join(typePath, csnp)
        
        const str = fs.readFileSync(csnpPath, 'utf8')

        const { content: body, data: dataMatter } = matter(str)
        const { name, prefix, description, scope } = dataMatter || {}

        let _valueMap
        if (snippetMap.has(name)) {
          _valueMap = snippetMap.get(name)
          snippetMap.delete(name)
        }
        snippetMap.set(name, {
          ..._valueMap,
          prefix,
          body: body.split('\n'),
          description,
          scope
        })
      })

      const snippetNew = Object.fromEntries(snippetMap)

      const _map = snippetsOrigin ? JSON.assign(snippetParsed, snippetNew, Object.keys(snippetNew)) : snippetNew

      const strs = JSON.stringify(_map, null, 2)

      fs.writeFile(targetFilePath, strs, (err) => {
        if (err) {
          throw Error('set snippets error!')
        }
      })
    }
  })

  log.success('success')

} catch (error) {
  log.error('[code execute error]', error)
  console.log('=>> error', error)
}
