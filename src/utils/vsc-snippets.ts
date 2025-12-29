import fs from 'node:fs'
import path from 'node:path'
import { currentOS } from '../utils/target-path'
import { Scope } from '../types/enums'

const pathGlobal = currentOS().pathSnippetsStored
const pathLocal = path.resolve('.vscode')

export const getSnippetVSC = (scope: Scope = Scope.LOCAL) => {
  const targetPath = scope === Scope.GLOBAL ? pathGlobal : pathLocal
  
  if (!targetPath || !fs.existsSync(targetPath)) {
    return []
  }

  const snippets = fs.readdirSync(targetPath, 'utf-8') || []
  return snippets.filter(snp => /.+\.((code-snippets)|(json))$/.test(snp))
}
