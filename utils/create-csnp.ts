import fs from 'node:fs'
import matter from 'gray-matter'

import { writeContents } from './write-contents.ts'

export const createCsnpLocal: __ACTUATOR__ = (
  snpPath: string,
  data = {
    name: '',
    prefix: '',
    description: '',
    scope: '',
  },
  body = 'code snippets'
) => {
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

type __ACTUATOR__  = (
  snpPath: string,
  data: {
    name: string
    prefix: string
    description: string
    scope?: string
  },
  body: string
) => Promise<{
  flag: boolean
  message?: string
  contents?: string
}>
