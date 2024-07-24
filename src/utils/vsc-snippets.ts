import fs from 'node:fs'
import { currentOS } from '../utils/target-path'

const pathSnp = currentOS().pathSnippetsStored

export const getSnippetVSC = () => {
  let snippets = pathSnp
    ? (fs.readdirSync(pathSnp, 'utf-8') || [])
    : []
  return snippets.filter(snp => /.+\.((code-snippets)|(json))$/.test(snp))
}
