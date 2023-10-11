import minimist from 'minimist'
import { putCsnpIntoVSC } from '../utils/csnp-to-vsc'
import { syncCsnpFromVSC } from '../scripts/pull'
import { Scope } from '../types/enums'

type Continue = boolean

export type Shunt = () => Promise<Continue>

export const shunt = <Shunt>(async () => {
  const argv = minimist(process.argv.slice(2))
  if (argv._?.[0] === 'push') {
    putCsnpIntoVSC(argv.global ? Scope.GLOBAL : Scope.LOCAL)
    return false
  } else if (argv._?.[0] === 'pull') {
    syncCsnpFromVSC(argv.global ? Scope.GLOBAL : Scope.LOCAL)
    return false
  } else
    return true
})
