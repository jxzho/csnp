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

  cli.option('-G, --global', 'Use Global scope')
  cli.option('-L, --list', 'List all stored code snippets files.')
  cli.option('-P, --preview', 'Preview all VSCode code snippets.')

  cli.command('push', 'Commit your code snippets into VSCode. (Default: Local)')

  cli.command('pull', 'Sync your code snippets from VSCode to edit. (Default: Local)')
  
  cli.help((sections) => {
    const newSections = sections
      .filter(section => section.title !== 'For more info, run any command with the `--help` flag')
      .map(section => {
        if (section.title === 'Options') {
          let body = section.body
          body = body.replace(/-h, --help/, '-H, --help')
          body = body.replace(/-v, --version/, '-V, --version')
          return { ...section, body }
        }
        return section
      })

    return [
      {
        body: `${pc.cyan(pc.inverse(' CSNP '))} v${pkgVersion}`
      },
      ...newSections,
      {
        title: 'Snippet Path Rule',
        body: `  ${pc.dim('.csnp/{SnippetType}/{SnippetName}.csnp')}`
      },
      {
        title: 'Examples',
        body: [
          `  $ ${pc.green('csnp')}                   ${pc.dim('Interactive mode (Create/Edit)')}`,
          `  $ ${pc.green('csnp push')}              ${pc.dim('Push to Local scope (.vscode)')}`,
          `  $ ${pc.green('csnp push -G')}           ${pc.dim('Push to Global scope (User)')}`,
          `  $ ${pc.green('csnp pull')}              ${pc.dim('Pull from Local scope')}`,
          `  $ ${pc.green('csnp pull -G')}           ${pc.dim('Pull from Global scope')}`,
          `  $ ${pc.green('csnp -P')}                ${pc.dim('Preview all snippets')}`,
          `  $ ${pc.green('csnp -L')}                ${pc.dim('List snippet files')}`,
        ].join('\n')
      }
    ]
  })
  cli.version(pkgVersion)

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

  // Manual routing for commands to ensure we await async operations
  if (cli.matchedCommandName === 'push') {
    await putCsnpIntoVSC(parsed.options.global ? Scope.GLOBAL : Scope.LOCAL)
    return false
  }

  if (cli.matchedCommandName === 'pull') {
    syncCsnpFromVSC(parsed.options.global ? Scope.GLOBAL : Scope.LOCAL)
    return false
  }

  if (parsed.options.list) {
    List(parsed.options.global ? Scope.GLOBAL : Scope.LOCAL)
    return false
  }
  
  if (parsed.options.preview) {
    Preview(parsed.options.global ? Scope.GLOBAL : Scope.LOCAL)
    return false
  }
  
  return true
}
