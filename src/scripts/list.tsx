import { Box, render, Text } from 'ink'
import path from 'node:path'
import { getSnippetVSC } from '../utils/vsc-snippets'
import { Log } from '../utils/log'

const List = () => {
  const list = getSnippetVSC()

  if (!list.length) {
    Log.info('No code snippets found.')
    return false
  }

  return render(
    <Box flexDirection='column' marginY={1}>
      {
        list.map(snippet => {
          const snippetType = path.parse(snippet).name
          return (
            <Box>
              <Text bold color="#7AC9C0">{snippetType} ➔ </Text>
              <Text key={snippet}>{snippet}</Text>
            </Box>
          )
        })
      }
    </Box>
  )
}

export { List }
