import { describe, it, expect, vi, beforeEach } from 'vitest'
import { syncCsnpFromVSC } from '../../src/scripts/pull'
import { getSnippetVSC } from '../../src/utils/vsc-snippets'
import { getSnippetFromVSC } from '../../src/utils/snippet-from-vsc'
import { createCsnpLocal } from '../../src/utils/create-csnp'
import { Log } from '../../src/utils/log'
import { Scope } from '../../src/types/enums'

vi.mock('../../src/utils/vsc-snippets')
vi.mock('../../src/utils/snippet-from-vsc')
vi.mock('../../src/utils/create-csnp')
vi.mock('../../src/utils/log', () => ({
  Log: { success: vi.fn(), error: vi.fn() }
}))

describe('Pull script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should sync snippets', async () => {
    vi.mocked(getSnippetVSC).mockReturnValue(['/path/to/js.csnp'])
    
    const mockMap = new Map()
    mockMap.set('log', { prefix: '-log', body: ['console.log'], description: 'log' })
    
    vi.mocked(getSnippetFromVSC).mockReturnValue({
      snippetMap: mockMap,
      snippetsOrigin: {} as any,
      snippetParsed: {} as any,
      targetFilePath: ''
    })

    vi.mocked(createCsnpLocal).mockResolvedValue({ flag: true, message: 'ok' })

    syncCsnpFromVSC(Scope.LOCAL)

    expect(getSnippetVSC).toHaveBeenCalled()
    expect(getSnippetFromVSC).toHaveBeenCalledWith('js', Scope.LOCAL)
    
    // Wait for async operations in forEach
    await new Promise(resolve => setTimeout(resolve, 10))

    expect(createCsnpLocal).toHaveBeenCalled()
    expect(Log.success).toHaveBeenCalled()
  })

  it('should log error if no snippets found to sync', async () => {
    vi.mocked(getSnippetVSC).mockReturnValue([])

    syncCsnpFromVSC(Scope.LOCAL)

    expect(Log.error).toHaveBeenCalledWith('\nOpus! Pull failed, no local csnp files found.\n')
    expect(createCsnpLocal).not.toHaveBeenCalled()
  })
})
