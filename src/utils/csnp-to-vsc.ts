import fs from 'node:fs'
import path from 'node:path'
import JSON from 'comment-json'
import matter from 'gray-matter'
import pc from 'picocolors'

import { Log } from '../utils/log'
import { getSnippetFromVSC } from './snippet-from-vsc'
import { writeContents } from './write-contents'

import { Scope } from '../types/enums'

const DIR_CSNP = '.vscode/.csnp'

const csnpTypes = () => {
  try {
    return fs.readdirSync(
      path.resolve(DIR_CSNP),
      'utf-8'
    )
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return null
    }
    throw error
  }
}

const isDir = (val: string) => fs.statSync(val).isDirectory()

export const putCsnpIntoVSC = async (scope: Scope) => {
  try {
    const types = csnpTypes()
    if (!types) {
      Log.error(`\nOpus! Push failed, no ${scope} csnp files found.\n`)
      return
    }

    types.forEach((type) => { 
      const typePath = path.resolve(DIR_CSNP, type)

      if (!isDir(typePath))
        return
      
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
        snippetMap.set(
          name,
          {
            ..._valueMap,
            prefix,
            body: body.split('\n'),
            description,
            scope
          }
        )
      })

      const snippetNew = Object.fromEntries(snippetMap)
      const _map = snippetsOrigin ? JSON.assign(snippetParsed, snippetNew, Object.keys(snippetNew)) : snippetNew
      const strs = JSON.stringify(_map, null, 2)

      writeContents(
        targetFilePath,
        strs
      )
      .catch((err) => {
        Log.error('\n' + err + '\n')
        throw (`push ${type} snippets error 💔`)
      })
    })
    Log.success(`\n Wow! Push done ✨ ${pc.cyan(`[${types}] [${scope}]`)} \n`)
  }
  catch (error) {
    Log.error('\n [csnp-to-vsc execute error] \n', error)
  }
}
