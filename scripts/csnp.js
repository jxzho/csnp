const prompts = require('prompts')

const { putCsnpIntoVSC } = require('../utils/csnp-to-vsc')

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
