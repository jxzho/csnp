import fs from 'node:fs'
import path from 'node:path'
import JSON from 'comment-json'

import { targetPath } from './target-path.ts'

import { Scope } from '../types/enums.ts'

export const getSnippetFromVSC = (snippetType: string, scope: Scope) => {
  let snippetsOrigin
  const targetFilePath = (scope === Scope.GLOBAL)
    ? targetPath(snippetType)
    : path.join(__dirname, '.vscode', `${snippetType}.code-snippets`)

  if (fs.existsSync(targetFilePath)) {
    snippetsOrigin = fs.readFileSync(targetFilePath, 'utf-8')
  }

  try {
    const snippetParsed = snippetsOrigin
      ? JSON.parse(snippetsOrigin)
      : {}

    const snippetMap = new Map(
      Array.isArray(snippetParsed)
        ? Object.entries(snippetParsed)
        : []
    )

    return {
      targetFilePath,
      snippetsOrigin,
      snippetParsed,
      snippetMap,
    }

  } catch (error) {
    throw(error)
  }
}
