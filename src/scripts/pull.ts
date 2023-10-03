import fs from 'node:fs'
import path from 'node:path'
import { cyan } from 'kolorist'
import { currentOS } from '../utils/target-path'
import { getSnippetFromVSC } from '../utils/snippet-from-vsc'
import { createCsnpLocal } from '../utils/create-csnp'
import { Log } from '../utils/log'
import { Scope } from '../types/enums'

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

export const syncCsnpFromVSC = (scope: Scope) => {
  getSnippetVSC().forEach(snippet => {
    const snippetType = path.parse(snippet).name
    const { snippetMap } = getSnippetFromVSC(snippetType, scope)

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

          const csnpLocalPath = `.vscode/.csnp/${snippetType}/${prefix}.csnp`

          try {
            await createCsnpLocal(
              csnpLocalPath,
              { 
                name: snpName,
                prefix,
                description,
                scope
              },
              snippetBody
            )
  
            Log.success(`sync ${prefix} done ✨ ${cyan(csnpLocalPath)}`)
          } catch (error) {
            Log.error(`💔 sync ${prefix}[${snippetType}] failed, ${error}`)
          }
        }
  
      })
    }
  })
}
