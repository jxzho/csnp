const fs = require('fs')
const path = require('path')
const { writeContents, log } = require('../../utils')

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
      log.error('=>> error', error)
    } finally {
      const { dir } = path.parse(targetPath)
      fs.rm(dir, { recursive: true, force: true }, (err) => {
        if (!err) {}
      })
    }

  })
})
