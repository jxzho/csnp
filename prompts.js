const fs = require('fs')
const os = require('os')

const prompts = require('prompts')
const { cyan } = require('kolorist')

const { currentOS } = require('./target-path')
const { createCsnp } = require('./create-csnp')
const { log } = require('./utils')

const exec = async () => {
  try {
    const pathSnp = currentOS().pathSnippetsStored

    if (pathSnp) {
      const mode = await prompts({
        type: 'confirm',
        name: 'snippetCreate',
        message: 'create new snippets',
        initial: true
      })

      if (mode.snippetCreate) {
        const res = await prompts([{
          type: 'text',
          name: 'type',
          message: 'use snippet type',
          initial: os.userInfo().username
        }, {
          type: 'text',
          name: 'name',
          message: 'input snippet name',
          initial: 'my-snippets'
        }, {
          type: 'text',
          name: 'prefix',
          message: 'prefix for snippet?',
        }])

        const snpPath = `./csnp/${res.type}/${res.name}.csnp`

        const created = await createCsnp(snpPath, {
          name: res.name,
          prefix: res.prefix
        })

        if (created) {
          printLoveTips(snpPath)
        } else {
          log.error('create failed!')
        }

      } else {
        let snippets = fs.readdirSync(pathSnp, 'utf-8')
        snippets = snippets.filter(snp => {
          return (/.+\.((code-snippets)|(json))$/.test(snp))
        })
        if (snippets.length) {
          const res = await prompts({
            type: 'select',
            name: 'snippetUser',
            message: 'select user snippets',
            choices: snippets.map(snp => ({
              value: snp,
              title: /(.+)\..+$/.exec(snp)[1]
            }))
          })
          console.log('=>> res', res.snippetUser)
        }
      }
    }
  } catch (error) {
    throw Error(error)
  }

  // console.log(lightGreen(JSON.stringify(res, null, 2)))
}

const printLoveTips = (snpPath) => {
  console.log(`
just use command 👇🏼

${cyan(`\`vim ${snpPath}\``)}

${cyan(`\`yarn run exec\``)}

to generate your snippets! ❤️
  `)
}

exec()
