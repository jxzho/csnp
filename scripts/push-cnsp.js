const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))

const { putCsnpIntoVSC }  = require('../utils/csnp-to-vsc')

const { Scope } = require('../utils/snippet-from-vsc')

const jumpInCsnp = (pathname) => {
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
