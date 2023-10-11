import os from 'node:os'
import path from 'node:path'

import { Platform } from './platform'

const $HOME = os.homedir()

const arrOS = [
  {
    in: Platform.Mac,
    pathSnippetsStored: `${$HOME}/Library/Application\ Support/Code/User/snippets`
  },
  {
    in: Platform.Linux,
    pathSnippetsStored: `${$HOME}/.config/Code/User/snippets`
  },
  {
    in: Platform.Win,
    pathSnippetsStored: `${process.env.APPDATA}\\Code\\User\\snippets`
  }
]

export const currentOS = () => ({ ...arrOS.find(os => os.in) })

const OS = currentOS()

export const targetPath = (name: string) => {
  const pathSnippetsStored = OS.pathSnippetsStored
  if (name && pathSnippetsStored)
    return path.join(pathSnippetsStored, `${name}.code-snippets`)
  else
    return ''
}
