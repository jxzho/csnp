import { render, Box, Text } from 'ink'
import { rcTable } from '../utils/rc-table'
import { version } from '../../package.json'

export const Help = () => {
  return render(
    <Box flexDirection='column' alignItems='center' marginY={1}>
      <Box flexDirection='column' alignItems='center'>
        <Text color="#7AC9C0" bold>CSNP Help</Text>
        <Text>version: {version}</Text>
      </Box>
      {
        rcTable({
          align: 'center',
          columns: [
            { title: 'Command', dataIndex: 'command', align: 'center', width: 20 },
            { title: 'Description', dataIndex: 'description', align: 'center', width: 20 },
            { title: 'Example', dataIndex: 'example', align: 'center', width: 20 },
          ],
          data: [
            {
              command: 'csnp push',
              description: 'Push your code snippets into vscode',
              example: 'csnp push'
            },
            {
              command: 'csnp pull',
              description: 'Pull your code snippets from vscode',
              example: 'csnp pull'
            },
            {
              command: 'csnp -l',
              description: 'List all code snippets',
              example: 'csnp -l'
            }
          ]
        })
      }
    </Box>
  )
}
