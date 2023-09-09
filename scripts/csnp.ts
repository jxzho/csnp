import prompts from 'prompts'

import { putCsnpIntoVSC } from '../utils/csnp-to-vsc.ts'

prompts({
  type: 'select',
  name: 'scope',
  message: 'Select snippet scope',
  validate: type => !type ? `select a scope, exp: local` : true,
  choices: [
    { title: 'Global', value: 'global' },
    { title: 'Local', value: 'local' }
  ],
  hint: ' '
}).then(({ scope }) => {
  putCsnpIntoVSC(scope)
})
