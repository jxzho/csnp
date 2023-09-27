import { Log } from './log'

export const onPromptCancel = () => {
  Log.error('csnp flow is canceled 💔')
  process.exit()
}
