import { describe, expect, test } from '@jest/globals'
import fs from 'node:fs'
import path from 'node:path'
import { writeContents } from '../../src/utils/write-contents'
import { Log } from '../../src/utils/log'

describe('write contents by path', () => {
  test('`writeContents`', async () => {

    const targetPath = path.join('./temp', '1.temp')
    const contents = 'test'

    try {
      const { parsed } = await writeContents(targetPath, contents)

      expect(parsed.dir).toBe(path.parse(targetPath).dir)

      fs.readFile(targetPath, 'utf-8', (err, data) => {
        if (!err) {
          expect(data).toBe(contents)
        }
      })

    } catch (error) {
      Log.error('=>> error', error)
    } finally {
      const { dir } = path.parse(targetPath)
      fs.rm(dir, { recursive: true, force: true }, (err) => {
        if (!err) {}
      })
    }

  })
})
