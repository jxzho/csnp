import { describe, it, expect, vi, beforeEach } from 'vitest'
import { exec, checkFileCsnpLocal } from '../../src/scripts/start'
import { shunt } from '../../src/utils/shunt'
import { currentOS } from '../../src/utils/target-path'
import { createCsnpLocal } from '../../src/utils/create-csnp'
import { getSnippetFromVSC } from '../../src/utils/snippet-from-vsc'
import { text, isCancel, cancel } from '@clack/prompts'
import { Log } from '../../src/utils/log'
import fs from 'node:fs'

vi.mock('../../src/utils/shunt', () => ({
  shunt: vi.fn()
}))
vi.mock('../../src/utils/target-path', () => ({
  currentOS: vi.fn().mockReturnValue({ pathSnippetsStored: 'mock-path' })
}))
vi.mock('../../src/utils/create-csnp')
vi.mock('../../src/utils/snippet-from-vsc')
vi.mock('../../src/utils/log', () => ({
  Log: { error: vi.fn() }
}))
vi.mock('@clack/prompts')
vi.mock('node:fs')

describe('Start script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  it('checkFileCsnpLocal should return string if file exists', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    expect(checkFileCsnpLocal('path')).toBeDefined()
  })

  it('exec should exit if shunt returns false', async () => {
    vi.mocked(shunt).mockResolvedValue(false)
    await exec()
    expect(currentOS).not.toHaveBeenCalled()
  })

  it('exec should proceed if shunt returns true', async () => {
    vi.mocked(shunt).mockResolvedValue(true)
    vi.mocked(currentOS).mockReturnValue({ pathSnippetsStored: 'path' } as any)
    
    // Mock prompts sequence
    vi.mocked(text)
      .mockResolvedValueOnce('js') // type
      .mockResolvedValueOnce('log') // name
      .mockResolvedValueOnce('-log') // prefix
      .mockResolvedValueOnce('log') // filename

    vi.mocked(isCancel).mockReturnValue(false)
    
    const mockMap = new Map()
    vi.mocked(getSnippetFromVSC).mockReturnValue({ snippetMap: mockMap } as any)
    
    vi.mocked(createCsnpLocal).mockResolvedValue({ flag: true, message: 'ok' })

    await exec()

    expect(createCsnpLocal).toHaveBeenCalled()
  })

  it('exec should handle cancel', async () => {
    // Mock process.exit
    const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any)

    vi.mocked(shunt).mockResolvedValue(true)
    vi.mocked(currentOS).mockReturnValue({ pathSnippetsStored: 'path' } as any)
    
    vi.mocked(text).mockResolvedValue(Symbol('cancel'))
    vi.mocked(isCancel).mockReturnValue(true)

    await exec()

    expect(cancel).toHaveBeenCalled()
    expect(mockExit).toHaveBeenCalledWith(0)
    mockExit.mockRestore()
  })
})
