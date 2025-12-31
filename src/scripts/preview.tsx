import { render, Box, Text } from 'ink'
import SyntaxHighlight from 'ink-syntax-highlight'
import path from 'node:path'
import { select, isCancel, cancel } from '@clack/prompts'
import { getSnippetVSC } from '../utils/vsc-snippets'
import { getSnippetFromVSC } from '../utils/snippet-from-vsc'
import { Scope } from '../types/enums';
import { getSnippetBody } from './pull'
import { Log } from '../utils/log'
import { TitledBox } from '../ui/titled-box'

const prompt = async (scope: Scope) => {
  const list = getSnippetVSC(scope)

  if (!list.length)
    return null

  if (list.length === 1)
    return list[0]

  const value = await select({
    message: 'Pick your code type',
    options: list.map(item => ({
      value: item,
      label: item
    })),
  })

  if (isCancel(value)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  return value
}

const Preview = async (scope: Scope = Scope.LOCAL) => {
  const snippet = await prompt(scope)
  if (!snippet)
    return Log.error(`\nNo ${scope} code snippets found.\n`)

  const snippetType = path.parse(snippet as string).name
  const { snippetParsed, snippetMap } = getSnippetFromVSC(snippetType, scope)
  if (!snippetMap.size)
    return Log.error(`\nNo [${snippet}] code snippets found.\n`)

  const SnippetCard = ({ name, data }: { name: string, data: any }) => (
    <TitledBox
      title={name}
      borderStyle="round"
      borderColor="gray"
      width={100}
      flexDirection='column'
      paddingX={2}
      paddingY={1}
    >
      <Box marginBottom={1} flexDirection="column">
        <SyntaxHighlight code={getSnippetBody(data.body)} />
      </Box>
      <Box flexDirection='column' alignItems='center'>
        <Box flexDirection='row'>
          <Text dimColor>Prefix: </Text>
          <Text color='#A6D6FE'>{data.prefix || '<no prefix>'}</Text>
        </Box>

        <Box flexDirection='row'>
          <Text dimColor>Description: </Text>
          <Text dimColor>{data.description || '<no description>'}</Text>
        </Box>

        <Box flexDirection='row'>
          <Text dimColor>Scope: </Text>
          <Text dimColor>{data.scope || '<no scope>'}</Text>
        </Box>
      </Box>
    </TitledBox>
  )

  render(
    <Box flexDirection="column" paddingY={1}>
      {Object.entries(snippetParsed).map(([name, val]) => (
        <SnippetCard key={name} name={name} data={val} />
      ))}
    </Box>
  )
}

export { Preview, prompt }
