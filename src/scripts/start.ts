import fs from 'node:fs'
import { resolve } from 'node:path'
import prompts from 'prompts'
import { cyan } from 'kolorist'
import { Scope } from '../types/enums'
import { currentOS } from '../utils/target-path'
import { createCsnpLocal } from '../utils/create-csnp'
import { Log } from '../utils/log'
import { getSnippetFromVSC } from '../utils/snippet-from-vsc'
import { onPromptCancel } from '../utils/event-handler'
import { shunt } from '../utils/shunt'

const checkFileCsnpLocal = (path: string) => {
  if (fs.existsSync(path))
    return `\`${path}\` already exists, pls re-input filename`
  else 
    return true
}

const exec = async () => {
  try {
    if (!await shunt())
      return

    const pathSnp = currentOS().pathSnippetsStored

    if (!pathSnp)
      return

    const { type: snippetType } = await prompts(
      {
        type: 'text',
        name: 'type',
        message: 'Input snippet type',
        initial: 'exp: sevlte, react, vue',
        validate: type => !type
          ? `please input type`
          : true
      },
      {
        onCancel: onPromptCancel
      }
    )

    const res = await prompts(
      [
        {
          type: 'text',
          name: 'name',
          message: 'Name for snippet',
          initial: 'exp: Log, Print, Console',
          validate: (name) => {
            return !name
              ? 'please input name!'
              : true
          }
        },
        {
          type: 'text',
          name: 'prefix',
          message: 'Prefix for snippet',
          initial: 'exp: -log',
          validate: (prefix) => {
            return !prefix
              ? 'please input prefix!'
              : true
          }
        },
        {
          type: 'text',
          name: 'filename',
          message: 'Input snippet file name',
          initial: 'exp-snippets, will get `exp-snippets.csnp`', 
          validate: (filename) => {
            const _path = resolve(`.vscode/.csnp/${snippetType}/${filename}.csnp`)
            return checkFileCsnpLocal(_path)
          }
        }
      ],
      {
        onCancel: onPromptCancel 
      }
    )

    const csnpPath = resolve(`.vscode/.csnp/${snippetType}/${res.filename}.csnp`)
    const { snippetMap } = getSnippetFromVSC(snippetType, Scope.LOCAL)
    const snippetExist = snippetMap.has(res.name) && snippetMap.get(res.name)
    
    const snippetBody = snippetExist
      ? (snippetExist.body || []).join('\n')
      : undefined

    const { flag, message } = await createCsnpLocal(
      csnpPath,
      {
        name: res.name,
        prefix: res.prefix,
        description: 'my snippet description'
      },
      snippetBody
    )

    if (flag)
      printLoveTips(csnpPath)
    else
      Log.error('\n' + message + '\n')
    
  }
  catch (error) {
    Log.error(error)
    throw Error(String(error))
  }
}

const printLoveTips = (pathLocal: string) => 
console.log(`
  ✨ Just edit code snippets

  to use command 👇🏼

  ${cyan(`code ${pathLocal}`)}

  ${cyan(`csnp push`)}

  ✨ to generate your snippets! ❤️
`)

exec()
