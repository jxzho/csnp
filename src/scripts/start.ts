import fs from 'node:fs'
import { resolve } from 'node:path'
import { intro, outro, text, isCancel, cancel } from '@clack/prompts'
import pc from 'picocolors'
import { Scope } from '../types/enums'
import { currentOS } from '../utils/target-path'
import { createCsnpLocal } from '../utils/create-csnp'
import { Log } from '../utils/log'
import { getSnippetFromVSC } from '../utils/snippet-from-vsc'
import { shunt } from '../utils/shunt'

export const checkFileCsnpLocal = (path: string) => {
  if (fs.existsSync(path))
    return `\`${path}\` already exists, pls re-input filename`
  else 
    return undefined
}

export const exec = async () => {
  try {
    if (!await shunt())
      return

    const pathSnp = currentOS().pathSnippetsStored

    if (!pathSnp)
      return

    intro(pc.inverse(' CSNP '))

    const snippetType = await text({
      message: 'Input snippet type',
      placeholder: 'exp: sevlte, react, vue',
      validate: value => !value ? `please input type` : undefined
    })

    if (isCancel(snippetType)) {
      cancel('Operation cancelled.')
      process.exit(0)
    }

    const name = await text({
      message: 'Name for snippet',
      placeholder: 'exp: Log, Print, Console',
      validate: value => !value ? 'please input name!' : undefined
    })

    if (isCancel(name)) {
      cancel('Operation cancelled.')
      process.exit(0)
    }

    const prefix = await text({
      message: 'Prefix for snippet',
      placeholder: 'exp: -log',
      validate: value => !value ? 'please input prefix!' : undefined
    })

    if (isCancel(prefix)) {
      cancel('Operation cancelled.')
      process.exit(0)
    }

    const filename = await text({
      message: 'Input snippet file name',
      placeholder: 'exp-snippets, will get `exp-snippets.csnp`',
      validate: (value) => {
        const _path = resolve(`.vscode/.csnp/${snippetType}/${value}.csnp`)
        return checkFileCsnpLocal(_path)
      }
    })

    if (isCancel(filename)) {
      cancel('Operation cancelled.')
      process.exit(0)
    }
    
    const res = {
      type: snippetType as string,
      name: name as string,
      prefix: prefix as string,
      filename: filename as string
    }

    const csnpPath = resolve(`.vscode/.csnp/${res.type}/${res.filename}.csnp`)
    const { snippetMap } = getSnippetFromVSC(res.type, Scope.LOCAL)
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
    
    outro(`You're all set!`)
  }
  catch (error) {
    Log.error(error)
    cancel(`Error: ${error}`)
    process.exit(1)
  }
}

const printLoveTips = (pathLocal: string) => 
console.log(`
  ✨ Just edit code snippets

  to use command 👇🏼

  ${pc.cyan(`code ${pathLocal}`)}

  ${pc.cyan(`csnp push`)}

  ✨ to generate your snippets! ❤️
`)

if (!process.env.VITEST) {
  exec()
}
