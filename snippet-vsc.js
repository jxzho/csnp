const fs = require('fs')
const path = require('path')
const JSON = require('comment-json')

const { targetPath } = require('./target-path')

const getSnippetFromVSC = (snippetType, scope) => {
  let snippetsOrigin
  const targetFilePath = (scope === 'global')
    ? targetPath(snippetType)
    : path.join(__dirname, '.vscode', `${snippetType}.code-snippets`)

  if (fs.existsSync(targetFilePath)) {
    snippetsOrigin = fs.readFileSync(targetFilePath, 'utf-8')
  }

  const snippetParsed = snippetsOrigin ? JSON.parse(snippetsOrigin) : {}
  const snippetMap = new Map(Object.entries(snippetParsed))

  return {
    targetFilePath,
    snippetsOrigin,
    snippetParsed,
    snippetMap,
  }
}

module.exports = {
  getSnippetFromVSC
}
