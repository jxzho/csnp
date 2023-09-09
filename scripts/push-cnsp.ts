import fs from 'node:fs'
import minimist from 'minimist'

import { putCsnpIntoVSC } from '../utils/csnp-to-vsc.ts'
import { Scope } from '../types/enums.ts'

const argv = minimist(process.argv.slice(2))

const jumpInCsnp = (pathname: string) => {
  if (fs.existsSync(pathname)) {
    putCsnpIntoVSC(Scope.GLOBAL)
  }
}

(function main () {
  if (argv.local) {
    const { type, file } = argv
    const pathCurrent = `./csnp/${type}/${file}.csnp`
    jumpInCsnp(pathCurrent)
  }
})()
