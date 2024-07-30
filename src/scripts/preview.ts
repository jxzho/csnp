import path from 'node:path'
import { getSnippetVSC } from '../utils/vsc-snippets'
import { onPromptCancel } from '../utils/event-handler'
import prompts from 'prompts'
import { getSnippetFromVSC } from '../utils/snippet-from-vsc'
import { Scope } from '../types/enums'
import { getSnippetBody } from './pull'
import { render } from 'ink'
import { rcTable } from '../utils/rc-table'

const prompt = async () => {
  const list = getSnippetVSC()
  
  const { value } = await prompts({
    message: 'Pick your code type',
    type: 'autocomplete',
    name: 'value',
    limit: 18,
    choices: list.map(item => ({
      title: item
    })),
    async suggest (input: string, choices) {
      const results = choices.filter(item => {
        const currentTitle = item.title
        return currentTitle.toLowerCase().includes( input.toLowerCase() )
      })
      return await results
    }
  }, { onCancel: onPromptCancel })

  return value
}

const Preview = async () => {
  const snippet = await prompt()
  const snippetType = path.parse(snippet).name
  
  const { snippetParsed } = getSnippetFromVSC(snippetType, Scope.GLOBAL)

  render(rcTable({
    data: Object.entries(snippetParsed).map(([name, val]) => ({
      name,
      ...val,
      body: getSnippetBody(val.body)
    })),
    columns: [
      { title: 'name', dataIndex: 'name' },
      { title: 'prefix', dataIndex: 'prefix' },
      { title: 'scope', dataIndex: 'scope' },
      { title: 'body', dataIndex: 'body' }
    ]
  }))
}

export { Preview, prompt }
