import fs from 'node:fs'
import path from 'node:path'
import JSON from 'comment-json'

import { targetPath } from './target-path'

import { Scope } from '../types/enums'

export const getSnippetFromVSC = (snippetType: string, scope: Scope) => {
  let snippetsOrigin
  const targetFilePath = (scope === Scope.GLOBAL)
    ? targetPath(snippetType)
    : path.resolve('.vscode', `${snippetType}.code-snippets`)

  if (fs.existsSync(targetFilePath)) {
    snippetsOrigin = fs.readFileSync(targetFilePath, 'utf-8')
  }

  try {
    const snippetParsed: Record<string, any> = snippetsOrigin
      ? JSON.parse(snippetsOrigin)
      : {} as any

    const snippetMap = new Map(
      snippetParsed
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
