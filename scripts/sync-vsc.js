const fs = require('fs')
const path = require('path')
const { currentOS } = require('../utils/target-path')
const { getSnippetFromVSC } = require('../utils/snippet-from-vsc')
const { createCsnpLocal } = require('../utils/create-csnp')

const pathSnp = currentOS().pathSnippetsStored

const getSnippetVSC = () => {
  let snippets = fs.readdirSync(pathSnp, 'utf-8') || []
  return snippets.filter(snp => {
    return (/.+\.((code-snippets)|(json))$/.test(snp))
  })
}

const getSnippetBody = (body = []) => {
  if (Array.isArray(body)) {
    return body.join('\n')
  }
  return body
}

const syncCsnpFromVSC = () => {
  getSnippetVSC().forEach(snippet => {
    const snippetType = path.parse(snippet).name
    const { snippetMap } = getSnippetFromVSC(snippetType)
    
    if (snippetMap.size) {
      snippetMap.forEach(async (snp, snpName) => {
        const {
          prefix,
          body = [],
          description = '',
          scope = ''
        } = snp || {}
  
        if (prefix) {
          const snippetBody = getSnippetBody(body)
          await createCsnpLocal(
            `./csnp/${snippetType}/${prefix}.csnp`,
            {
              name: snpName,
              prefix,
              description,
              scope
            },
            snippetBody
          )
        }
  
      })
    }
  
  })
}

syncCsnpFromVSC()

module.exports = {
  getSnippetVSC,
  getSnippetBody,
}
