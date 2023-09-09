import fs from 'node:fs'
import path, { ParsedPath } from 'node:path'
import util from 'node:util'

const mkdir = util.promisify(fs.mkdir)

export const writeContents = (currentPath: string, contents: string) => {
  const parsed = path.parse(currentPath)
  const { dir } = parsed
  return new Promise<{
    parsed: ParsedPath
    contents: string
  }>((resolve, reject) => {
    mkdir(dir, { recursive: true }).then(() => {
      fs.writeFile(currentPath, contents, 'utf-8', (err) => {
        if (!err) {
          resolve({
            parsed,
            contents
          })
        } else {
          reject(err)
        }
      })
    })
  })
}
