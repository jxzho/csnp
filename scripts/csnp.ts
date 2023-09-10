import prompts from 'prompts'

import { putCsnpIntoVSC } from '../utils/csnp-to-vsc.ts'
import { onPromptCancel } from '../utils/event-handler.ts'

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
}, {
  onCancel: onPromptCancel
}).then(({ scope }) => {
  putCsnpIntoVSC(scope)
})
