const fs = require('fs')
const os = require('os')
const path = require('path')

const prompts = require('prompts')
const { cyan } = require('kolorist')

const { currentOS } = require('./target-path')
const { createCsnpLocal } = require('./create-csnp')
const { log } = require('./utils')
const { getSnippetFromVSC } = require('./snippet-vsc')

const checkFileCsnpLocal = (path) => {
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
      const snippets = fs.readdirSync('csnp', 'utf-8')

      // const { snippetMode: initMode } = await prompts({
      //   type: 'select',
      //   name: 'snippetMode',
      //   message: 'Select init mode',
      //   choices: [
      //     {
      //       title: 'create',
      //       value: 'create',
      //       description: 'new snippet in dir-csnp',
      //     },
      //     {
      //       title: 'select',
      //       value: 'select',
      //       description: [
      //         'use snippet type in dir-csnp',
      //         snippets,
      //       ].join(' - '),
      //       disabled: snippets.length === 0,
      //     }
      //   ],
      //   initial: 0,
      //   warn: 'no snippet types currently!',
      //   hint: ' '
      // })

      // const selectSnippetType = () => {
      //   // snippets = snippets.filter(snp => {
      //   //   return (/.+\.((code-snippets)|(json))$/.test(snp))
      //   // })
        
      //   return {
      //     type: 'select',
      //     name: 'type',
      //     message: 'Select snippet type',
      //     choices: snippets.map(snp => {
      //       // const prefixName = path.parse(snp).name
      //       return {
      //         value: snp,
      //         title: snp
      //       }
      //     })
      //   }
      // }

      const { type: snippetType } = await prompts({
        type: 'text',
        name: 'type',
        message: 'Input snippet type',
        initial: snippets.join(', ')
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
        initial: 'My Snippet'
      }, {
        type: 'text',
        name: 'prefix',
        message: 'Prefix for snippet?',
      }, {
        type: 'text',
        name: 'filename',
        message: 'Input snippet file name',
        initial: 'my-snippets',
        validate: (filename) => {
          const snpPathLocal = `./csnp/${snippetType}/${filename}.csnp`
          return checkFileCsnpLocal(snpPathLocal)
        }
      }])

      const snpPathLocal = `./csnp/${snippetType}/${res.filename}.csnp`

      const { snippetMap } = getSnippetFromVSC(snippetType)
      const snippetExist = snippetMap.has(res.name) && snippetMap.get(res.name)
      
      const snippetBody = snippetExist
        ? (snippetExist.body || []).join('\n')
        : undefined

      const { flag, message } = await createCsnpLocal(snpPathLocal, {
        name: res.name,
        prefix: res.prefix,
        description: 'my snippet description',
      }, snippetBody)

      if (flag) {
        printLoveTips(snpPathLocal)
      } else {
        log.error('\n' + message + '\n')
      }
    }
  } catch (error) {
    log.error(error)
    throw Error(error)
  }

  // console.log(lightGreen(JSON.stringify(res, null, 2)))
}

const printLoveTips = (pathLocal) => {
  console.log(`
✨ just use command 👇🏼

${cyan(`\`vim ${pathLocal}\``)}

${cyan(`\`yarn run csnp\``)}

✨ to generate your snippets! ❤️
  `)
}

exec()
