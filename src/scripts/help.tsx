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
          titleAlign: 'center',
          columns: [
            { title: 'Command', dataIndex: 'command', width: 20 },
            { title: 'Description', dataIndex: 'description', width: 20 },
            { title: 'Example', dataIndex: 'example', width: 20 },
          ],
          data: [
            {
              command: 'csnp push',
              description: 'Commit your code snippets into VSCode.',
              example: 'csnp push'
            },
            {
              command: 'csnp pull',
              description: 'Sync your code snippets from VSCode to edit.',
              example: 'csnp pull'
            },
            {
              command: 'csnp --preview',
              description: 'Preview all VSCode code snippets.',
              example: 'csnp --preview\ncsnp -p'
            },
            {
              command: 'csnp --list',
              description: 'List all stored code snippets files.',
              example: `csnp --list\ncsnp -l`
            }
          ]
        })
      }
    </Box>
  )
}
