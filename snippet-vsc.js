const fs = require('fs')
const JSON = require('comment-json')

const { targetPath } = require('./target-path')

const getSnippetFromVSC = (snippetType) => {
  let snippetsOrigin
  const targetFilePath = targetPath(snippetType)

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
