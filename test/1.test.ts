import { describe, expect, test } from '@jest/globals'
import fs from 'node:fs'
import path from 'node:path'
import { createCsnpLocal } from '../src/utils/create-csnp'
import { Log } from '../src/utils/log'

describe('create local csnp by', () => {
  const csnpWherePutInto = path.resolve('test', 'csnp/1.csnp')

  test('`createCsnpLocal`', async () => {
    const { flag, contents, message } = await createCsnpLocal(
      csnpWherePutInto,
      {
        name: 'My Snippet',
        prefix: '-prefix',
        description: 'my snippet description',
      },
      'code snippets'
    )

    if (!flag) {
      return Log.error(message)
    }

    expect(flag).toBe(true)

    expect(contents).toMatchInlineSnapshot(`
"---
name: My Snippet
prefix: '-prefix'
description: my snippet description
---
code snippets"
`)
    
    // remove csnp file by using `createCsnpLocal` cmd
    if (flag) {
      fs.unlink(csnpWherePutInto, (err) => {
        if (!err) {}
      })
    }
  })
})
