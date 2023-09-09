import fs from 'node:fs'
import { join } from 'node:path'
import prompts from 'prompts'
import { cyan } from 'kolorist'

import { currentOS } from '../utils/target-path.ts'
import { createCsnpLocal } from '../utils/create-csnp.ts'
import { Log } from '../utils/log.ts'
import { getSnippetFromVSC } from '../utils/snippet-from-vsc.ts'

import { Scope } from '../types/enums.ts'

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
      // const snippets = fs.readdirSync(
      //   join(__dirname, 'csnp'),
      //   'utf-8'
      // )

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
      })

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
          const _path = join(__dirname, '..', `csnp/${snippetType}/${filename}.csnp`)
          return checkFileCsnpLocal(_path)
        }
      }])

      const csnpPath = join(__dirname, '..', `csnp/${snippetType}/${res.filename}.csnp`)

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
          description: 'my snippet description',
          scope: Scope.LOCAL
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

  ${cyan(`\`yarn run csnp\``)}

  ✨ to generate your snippets! ❤️
`)

exec()
