import { Log } from './log'

export const onPromptCancel = () => {
  Log.error('csnp canceled 💔')
  process.exit()
}
