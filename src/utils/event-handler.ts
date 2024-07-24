import { Log } from './log'

export const onPromptCancel = () => {
  Log.error('\n Ouch: CSNP has canceled. \n')
  process.exit(1)
}
