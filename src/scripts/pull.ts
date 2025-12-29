import path from 'node:path'
import pc from 'picocolors'
import { getSnippetFromVSC } from '../utils/snippet-from-vsc'
import { createCsnpLocal } from '../utils/create-csnp'
import { Log } from '../utils/log'
import { Scope } from '../types/enums'
import { getSnippetVSC } from '../utils/vsc-snippets'

export const getSnippetBody = (body = []) => {
  if (Array.isArray(body))
    return body.join('\n')
  else
    return body
}

export const syncCsnpFromVSC = (scopeValue: Scope) => {
  getSnippetVSC().forEach(snippet => {
    const snippetType = path.parse(snippet).name
    const { snippetMap } = getSnippetFromVSC(snippetType, scopeValue)

    if (snippetMap.size) {
      snippetMap.forEach(async (snp, snpName) => {
        const {
          prefix,
          body = [],
          description = '',
          scope = ''
        } = snp || {}

        if (!prefix)
          return

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
          Log.success(`\n Yay! Sync done ✨ ${pc.cyan(csnpLocalPath)} [${scopeValue}] \n`)
        }
        catch (error) {
          Log.error(`\n Ouch: Sync ${prefix}[${snippetType}] failed, ${error} \n`)
        }
      })
    }
  })
}
