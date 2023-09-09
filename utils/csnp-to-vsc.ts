import fs from 'node:fs'
import path from 'node:path'
import JSON from 'comment-json'
import matter from 'gray-matter'

import { Log } from '../utils/log.ts'
import { getSnippetFromVSC } from './snippet-from-vsc.ts'

import { Scope } from '../types/enums.ts'

const DIR_CSNP = 'csnp'

const csnpTypes = () => fs.readdirSync(path.join(__dirname, '..', DIR_CSNP), 'utf-8')

const isDir = (val: string) => fs.statSync(val).isDirectory()

export const putCsnpIntoVSC = async (scope: Scope) => {
  try {
    csnpTypes().forEach((type) => { 
      const typePath = path.join(__dirname, '..', DIR_CSNP, type)
      if (isDir(typePath)) {
        const {
          snippetMap,
          snippetsOrigin,
          snippetParsed,
          targetFilePath
        } = getSnippetFromVSC(type, scope)

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
            Log.error('\n' + err + '\n')
            throw Error(`set snippets error!`)
          }
        })
      }
    })

    Log.success('success')

  } catch (error) {
    Log.error('[code execute error]', error)
  }
}
