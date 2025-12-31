import { cac } from 'cac'
import pc from 'picocolors'
import { putCsnpIntoVSC } from '../utils/csnp-to-vsc'
import { syncCsnpFromVSC } from '../scripts/pull'
import { Scope } from '../types/enums'
import { List } from '../scripts/list'
import { Preview } from '../scripts/preview'
import { version as pkgVersion } from '../../package.json'

export const shunt = async (): Promise<boolean> => {
  const cli = cac('csnp')
  let isInteractive = true

  const getScope = (options: { global?: boolean }) => options.global ? Scope.GLOBAL : Scope.LOCAL

  cli.option('-G, --global', 'Use Global scope')

  cli.command('push', 'Commit your code snippets into VSCode. (Default: Local)')
    .action(async (options) => {
      isInteractive = false
      await putCsnpIntoVSC(getScope(options))
    })

  cli.command('pull', 'Sync your code snippets from VSCode to edit. (Default: Local)')
    .action((options) => {
      isInteractive = false
      syncCsnpFromVSC(getScope(options))
    })

  cli.command('list', 'List all stored code snippets files.')
    .alias('ls')
    .action((options) => {
      isInteractive = false
      List(getScope(options))
    })

  cli.command('preview', 'Preview all VSCode code snippets.')
    .alias('pv')
    .action((options) => {
      isInteractive = false
      Preview(getScope(options))
    })
  
  cli.help(() => {
    const commands = [
      { name: 'push [option]', desc: 'Commit your code snippets into VSCode. (Default: Local)' },
      { name: 'pull [option]', desc: 'Sync your code snippets from VSCode to edit. (Default: Local)' },
      { name: 'ls, list [option]', desc: 'List all stored code snippets files.' },
      { name: 'pv, preview [option]', desc: 'Preview all VSCode code snippets.' },
      { name: '-L, --list', desc: `${pc.yellow('(Deprecated)')} List all stored code snippets files.` },
      { name: '-P, --preview', desc: `${pc.yellow('(Deprecated)')} Preview all VSCode code snippets.` },
      { name: '-H, --help', desc: 'Display this message' },
      { name: '-V, --version', desc: 'Display version number' }
    ]

    const options = [
      { name: '-G, --global', desc: 'Use Global scope' }
    ]

    const padLength = 25 
    
    const format = (items: { name: string, desc: string }[]) => {
      return items.map(item => `  ${item.name.padEnd(padLength)}${pc.dim(item.desc)}`).join('\n')
    }

    return [
      {
        body: `${pc.cyan(pc.inverse(' CSNP '))} v${pkgVersion}`
      },
      {
        title: 'Commands',
        body: format(commands)
      },
      {
        title: 'Options',
        body: format(options)
      },
      {
        title: 'Snippet Path Rule',
        body: `  ${pc.dim('.csnp/{SnippetType}/{SnippetName}.csnp')}`
      },
      {
        title: 'Examples',
        body: [
          `  $ ${pc.greenBright('csnp')}                   ${pc.dim('Interactive mode (Create/Edit)')}`,
          `  $ ${pc.greenBright('csnp push')}              ${pc.dim('Push to Local scope (.vscode)')}`,
          `  $ ${pc.greenBright('csnp push -G')}           ${pc.dim('Push to Global scope (User)')}`,
          `  $ ${pc.greenBright('csnp pull')}              ${pc.dim('Pull from Local scope')}`,
          `  $ ${pc.greenBright('csnp pull -G')}           ${pc.dim('Pull from Global scope')}`,
          `  $ ${pc.greenBright('csnp preview')}           ${pc.dim('Preview all snippets')}`,
          `  $ ${pc.greenBright('csnp ls')}                ${pc.dim('List snippet files')}`,
        ].join('\n')
      }
    ]
  })

  // Parse argv. Note: cac automatically handles --help and --version
  const parsed = cli.parse()

  // Handle upper case -H and -V manually
  if (parsed.options.H) {
    cli.outputHelp()
    return false
  }
  
  if (parsed.options.V) {
    console.log(`v${pkgVersion}`)
    return false
  }

  // Ensure we stop if default help/version was triggered but didn't exit
  if (parsed.options.help || parsed.options.version) {
    return false
  }

  if (!isInteractive) {
    return false
  }

  if (parsed.options.L || parsed.options.list) {
    console.warn(pc.yellow('\n  Deprecation Warning: -L / --list option is deprecated.\n  Please use "csnp list" or "csnp ls" command instead.\n'))
    List(getScope(parsed.options))
    return false
  }

  if (parsed.options.P || parsed.options.preview) {
    console.warn(pc.yellow('\n  Deprecation Warning: -P / --preview option is deprecated.\n  Please use "csnp preview" or "csnp pv" command instead.\n'))
    Preview(getScope(parsed.options))
    return false
  }
  
  return true
}
