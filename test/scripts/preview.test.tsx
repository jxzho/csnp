import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from 'ink'
import { Preview, prompt } from '../../src/scripts/preview'
import { getSnippetVSC } from '../../src/utils/vsc-snippets'
import { getSnippetFromVSC } from '../../src/utils/snippet-from-vsc'
import { Scope } from '../../src/types/enums'
import { select, isCancel, cancel } from '@clack/prompts'

vi.mock('ink', () => ({
  render: vi.fn(),
  Box: ({ children }: any) => React.createElement('div', null, children),
  Text: ({ children }: any) => React.createElement('span', null, children),
}))

vi.mock('@clack/prompts')

vi.mock('../../src/utils/vsc-snippets')
vi.mock('../../src/utils/snippet-from-vsc')

describe('Preview script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('prompt should return value', async () => {
    vi.mocked(getSnippetVSC).mockReturnValue(['js.csnp'])
    vi.mocked(select).mockResolvedValue('js.csnp')
    vi.mocked(isCancel).mockReturnValue(false)

    const res = await prompt(Scope.LOCAL)
    expect(res).toBe('js.csnp')
  })


  it('Preview should render table', async () => {
    vi.mocked(getSnippetVSC).mockReturnValue(['js.csnp'])
    vi.mocked(select).mockResolvedValue('js.csnp')
    vi.mocked(isCancel).mockReturnValue(false)
    
    vi.mocked(getSnippetFromVSC).mockReturnValue({
      snippetParsed: {
        log: {
          prefix: '-log',
          body: ['console.log'],
          description: 'log',
          scope: 'javascript'
        }
      }
    } as any)

    await Preview()

    expect(render).toHaveBeenCalled()
  })
})
