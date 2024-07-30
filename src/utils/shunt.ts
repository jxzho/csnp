import minimist from 'minimist'
import { putCsnpIntoVSC } from '../utils/csnp-to-vsc'
import { syncCsnpFromVSC } from '../scripts/pull'
import { Scope } from '../types/enums'
import { Help } from '../scripts/help'
import { List } from '../scripts/list'
import { Preview } from '../scripts/preview'
import { version as pkgVersion } from '../../package.json'

type Continue = boolean

export type Shunt = () => Promise<Continue>

export const shunt = <Shunt>(async () => {
  const argv = minimist(process.argv.slice(2))

  if (argv.v || argv.V || argv.version) {
    console.log(`v${pkgVersion}`)
    return false
  }

  if (argv.l || argv.L || argv.list) {
    List()
    return false
  }

  if (argv.h || argv.help) {
    Help()
    return false
  }

  if (argv.p || argv.P || argv.preview) {
    Preview()
    return false
  }

  switch (argv._?.[0]) {
    case 'push':
      putCsnpIntoVSC(argv.global ? Scope.GLOBAL : Scope.LOCAL)
      return false
    case 'pull':
      syncCsnpFromVSC(argv.global ? Scope.GLOBAL : Scope.LOCAL)
      return false
    default:
      return true
  }
})
