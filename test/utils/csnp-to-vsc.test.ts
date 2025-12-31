import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'node:fs'
import { putCsnpIntoVSC } from '../../src/utils/csnp-to-vsc'
import { Log } from '../../src/utils/log'
import { Scope } from '../../src/types/enums'

vi.mock('node:fs')
vi.mock('../../src/utils/log', () => ({
  Log: { success: vi.fn(), error: vi.fn() }
}))

describe('csnp-to-vsc utility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should log error if .csnp directory does not exist', async () => {
    const error: any = new Error('ENOENT')
    error.code = 'ENOENT'
    vi.mocked(fs.readdirSync).mockImplementation(() => {
      throw error
    })

    await putCsnpIntoVSC(Scope.LOCAL)

    expect(Log.error).toHaveBeenCalledWith('\nOpus! Push failed, no local csnp files found.\n')
  })
})
