import fs from 'node:fs'
import path from 'node:path'

import { currentOS } from '../utils/target-path.ts'
import { getSnippetFromVSC } from '../utils/snippet-from-vsc.ts'
import { createCsnpLocal } from '../utils/create-csnp.ts'

import { Scope } from '../types/enums.ts'

const pathSnp = currentOS().pathSnippetsStored

const getSnippetVSC = () => {
  let snippets = pathSnp
    ? (fs.readdirSync(pathSnp, 'utf-8') || [])
    : []
  return snippets.filter(snp => {
    return (/.+\.((code-snippets)|(json))$/.test(snp))
  })
}

export const getSnippetBody = (body = []) => {
  if (Array.isArray(body)) {
    return body.join('\n')
  }
  return body
}

export const syncCsnpFromVSC = () => {
  getSnippetVSC().forEach(snippet => {
    const snippetType = path.parse(snippet).name
    const { snippetMap } = getSnippetFromVSC(snippetType, Scope.LOCAL)
    
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
