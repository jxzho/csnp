const { createCsnpLocal } = require('../../create-csnp')

const { log } = require('../../utils')

const fs = require('fs')
const path = require('path')

describe('start', () => {
  test('getSnippetFromVSC: vue', async () => {

    const csnpPathWaitToCreated = path.join(__dirname, 'csnp/2.csnp')

    const { flag, contents, message } = await createCsnpLocal(
      csnpPathWaitToCreated,
      {
        name: 'My Snippet',
        prefix: '-prefix',
        description: 'my snippet description',
      },
      'code snippets'
    )

    if (!flag) {
      log.error(message)
    }

    expect(flag).toBe(true)

    const _contentCsnpTest = fs.readFileSync(
      path.join(__dirname, 'csnp/1.csnp'), 'utf-8')
    
    expect(contents).toBe(_contentCsnpTest)
    
    // 删除 `createCsnpLocal` 创建的 csnp 文件
    if (flag) {
      fs.unlink(csnpPathWaitToCreated, (err) => {
        if (!err) {}
      })
    }

  })
})
