import fs from 'node:fs'
import { resolve } from 'node:path'
import prompts from 'prompts'
import { cyan } from 'kolorist'
import { Scope } from '../types/enums.ts'
import { currentOS } from '../utils/target-path.ts'
import { createCsnpLocal } from '../utils/create-csnp.ts'
import { Log } from '../utils/log.ts'
import { getSnippetFromVSC } from '../utils/snippet-from-vsc.ts'
import { onPromptCancel } from '../utils/event-handler.ts'

const checkFileCsnpLocal = (path: string) => {
  if (fs.existsSync(path)) {
    return `\`${path}\` already exists, pls re-input filename`
  } else {
    return true
  }
}

const exec = async () => {
  try {
    const pathSnp = currentOS().pathSnippetsStored

    if (pathSnp) {
      const { type: snippetType } = await prompts({
        type: 'text',
        name: 'type',
        message: 'Input snippet type',
        validate: type => !type ? `please input type, exp: vue` : true
        // initial: os.userInfo().username,
        // validate: (type) => {
        //   return snippets.includes(type)
        //     ? `\`${type}\` already exists, pls re-input type`
        //     : true
        // }
      }, { onCancel: onPromptCancel })

      const res = await prompts([{
        type: 'text',
        name: 'name',
        message: 'Name for snippet?',
        initial: 'My Snippet',
        validate: (name) => {
          return !name ? 'please input name!' : true
        }
      }, {
        type: 'text',
        name: 'prefix',
        message: 'Prefix for snippet?',
        validate: (prefix) => {
          return !prefix ? 'please input prefix!' : true
        }
      }, {
        type: 'text',
        name: 'filename',
        message: 'Input snippet file name',
        initial: 'my-snippets', 
        validate: (filename) => {
          const _path = resolve(`csnp/${snippetType}/${filename}.csnp`)
          return checkFileCsnpLocal(_path)
        }
      }], { onCancel: onPromptCancel })

      const csnpPath = resolve(`csnp/${snippetType}/${res.filename}.csnp`)

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

      if (flag) {
        printLoveTips(csnpPath)
      } else {
        Log.error('\n' + message + '\n')
      }
    }
  } catch (error) {
    Log.error(error)
    throw Error(String(error))
  }
}

const printLoveTips = (pathLocal: string) => 
console.log(`
  ✨ just use command 👇🏼

  ${cyan(`\`vim ${pathLocal}\``)}

  ${cyan(`\`pnpm csnp\``)}

  ✨ to generate your snippets! ❤️
`)

exec()
