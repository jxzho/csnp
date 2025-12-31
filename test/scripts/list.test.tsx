import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from 'ink'
import { List } from '../../src/scripts/list'
import { getSnippetVSC } from '../../src/utils/vsc-snippets'
import { Log } from '../../src/utils/log'

vi.mock('ink', () => ({
  render: vi.fn(),
  Box: ({ children }: any) => React.createElement('div', null, children),
  Text: ({ children }: any) => React.createElement('span', null, children),
}))

vi.mock('../../src/utils/vsc-snippets', () => ({
  getSnippetVSC: vi.fn()
}))

vi.mock('../../src/utils/log', () => ({
  Log: {
    info: vi.fn(),
    error: vi.fn()
  }
}))

describe('List script', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should log error if no snippets found', () => {
    vi.mocked(getSnippetVSC).mockReturnValue([])
    List()
    expect(Log.error).toHaveBeenCalledWith('\nNo local code snippets found.\n')
    expect(render).not.toHaveBeenCalled()
  })

  it('should render list if snippets found', () => {
    vi.mocked(getSnippetVSC).mockReturnValue(['/path/to/js.csnp', '/path/to/ts.csnp'])
    List()
    expect(Log.info).not.toHaveBeenCalled()
    expect(render).toHaveBeenCalled()
  })
})
