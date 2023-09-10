import { Log } from './log.ts'

export const onPromptCancel = () => {
  Log.error('Script Flow Is Canceled')
  process.exit()
}
