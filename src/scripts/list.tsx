import { Box, render, Text } from 'ink'
import path from 'node:path'
import { getSnippetVSC } from '../utils/vsc-snippets'
import { Log } from '../utils/log'
import { Scope } from '../types/enums'

const List = (scope: Scope = Scope.LOCAL) => {
  const list = getSnippetVSC(scope)

  if (!list.length) {
    Log.info(`No ${scope} code snippets found.`)
    return false
  }

  return render(
    <Box flexDirection='column' marginY={1}>
      {
        list.map((snippet, i) => {
          const snippetType = path.parse(snippet).name
          return (
            <Box key={`snippet-${i}`}>
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
