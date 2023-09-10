import { describe, expect, test } from '@jest/globals'
import fs from 'node:fs'
import path from 'node:path'
import { createCsnpLocal } from '../../utils/create-csnp'
import { Log } from '../../utils/log'

describe('create local csnp by', () => {
  const csnpWherePutInto = path.resolve('__test__', 'local/csnp/1.csnp')

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

    const csnp2WherePutInto = path.resolve('__test__', 'local/csnp/2.csnp')

    const _contentCsnpTest = fs.readFileSync(
      csnp2WherePutInto,
      'utf-8'
    )
    
    expect(contents).toBe(_contentCsnpTest)
    
    // remove .csnp file by using `createCsnpLocal` cmd
    if (flag) {
      fs.unlink(csnpWherePutInto, (err) => {
        if (!err) {}
      })
    }
  })
})
