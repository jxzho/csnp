import fs from 'node:fs'
import matter from 'gray-matter'

import { writeContents } from './write-contents.ts'

export const createCsnpLocal = (
  snpPath: string,
  data = {
    name: '',
    prefix: '',
    description: '',
    scope: '',
  },
  body = 'code snippets'
): Promise<{
  flag: boolean
  message?: string
  contents?: string
}> => {
  if (fs.existsSync(snpPath)) {
    return Promise.resolve({
      flag: false,
      message: `${snpPath} file already exists!`
    })
  }

  return writeContents(
    snpPath,
    matter.stringify(body, data)
  ).then(({ contents }) => {
    return {
      flag: true,
      contents
    }
  })
}
