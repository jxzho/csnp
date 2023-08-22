const os = require('os')
const path = require('path')
const { Mac, Win, Linux } = require('./platform')

const $HOME = os.homedir()

const arrOS = [
  {
    in: Mac,
    pathSnippetsStored: `${$HOME}/Library/Application\ Support/Code/User/snippets`
  },
  {
    in: Linux,
    pathSnippetsStored: `${$HOME}/.config/Code/User/snippets`
  },
  {
    in: Win,
    pathSnippetsStored: `${process.env.APPDATA}\\Code\\User\\snippets`
  }
]

const currentOS = () => ({
  ...arrOS.find(os => os.in)
})

const OS = currentOS()

const _val = (name) => {
  return name ? path.join(OS.pathSnippetsStored, `${name}.code-snippets`) : ''
}

module.exports = {
  targetPath: _val,
  currentOS
}

