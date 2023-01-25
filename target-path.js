const os = require('os')
const path = require('path')

const { Mac, Win, Linux } = require('./platform')

const $HOME = os.homedir()

const map = {
  Mac: {
    in: Mac,
    path: `${$HOME}/Library/Application Support/Code/User/snippets`
  },
  Linux: {
    in: Linux,
    path: `${$HOME}/.config/Code/User/snippets`
  },
  Win: {
    in: Win,
    path: `${process.env.APPDATA}\Code\User\snippets`
  }
}

const pathWith = Object.entries(map).filter(([_, val]) => val.in).map(([_, { path }]) => path)[0]

const _val = (name) => {
  return path.join(pathWith, `${name}.code-snippets`)
}

module.exports = {
  targetPath: _val
}

