import { Box, Text } from 'ink'
import { border } from './ui-cli'
import { Key } from './gen-key'
import { PropsBox } from '../types/ink'

type ConfigRcTable = {
  align?: PropsBox['alignItems']
  columns: {
    title: string
    dataIndex: string
    width?: string | number
    align?: PropsBox['justifyContent']
  }[]
  data: (Record<string, string | number>)[]
}

function Table (props: ConfigRcTable) {
  const colNum = props.columns.length

  const dataNum = props.data.length

  const widthCol = `${+((1 / colNum) * 100).toFixed(1)}%`

  const ceiling = row({
    data: props.columns.map((item, i) => ({
      value: '',
      width: item.width || widthCol,
      box: {

        borderTop: false,
        borderBottom: true,
        borderStyle: border.draw({
          bottomLeft: i === 0 ? border.topLeftRound : border.topCross,
          bottom: border.bottom,
          bottomRight: i === colNum - 1 ? border.topRightRound : border.topCross
        })
      }
    }))
  })

  const separator = () => row({
    data: props.columns.map((item, i) => ({
      value: '',
      width: item.width || widthCol,
      box: {
        borderTop: false,
        borderBottom: true,
        borderStyle: border.draw({
          bottomLeft: i === 0 ? border.leftCross : border.cross,
          bottom: border.bottom,
          bottomRight: (i === colNum - 1) ? border.rightCross : border.cross
        })
      }
    }))
  })

  const floor = row({
    data: props.columns.map((item, i) => ({
      value: '',
      width: item.width || widthCol,
      box: {
        borderTop: true,
        borderBottom: false,
        borderStyle: border.draw({
          topLeft: i === 0 ? border.bottomLeftRound : border.bottomCross,
          top: border.top,
          topRight: i === colNum - 1 ? border.bottomRightRound : border.bottomCross
        })
      }
    }))
  })

	return (
		<Box flexDirection="column" alignItems={props.align} paddingX={2}>
      {ceiling}

			{row({
        data: props.columns.map((item) => ({
          value: item.title,
          width: item.width || widthCol,
          textConfig: { bold: true },
          box: { justifyContent: 'center' }
        }))
      })}

      {separator()}

			{props.data.flatMap((item, i) => (
        [
          row({
            data: props.columns.map((col) => ({
              value: item[col.dataIndex],
              width: col.width || widthCol,
              box: {
                paddingX: 1,
                justifyContent: col.align
              }
            }))
          }),
          i !== dataNum - 1 && separator()
        ]
      ))}

      {floor}
		</Box>
	);
}

function row (props: {
  data: {
    value: string | number
    width: string | number
    textConfig?: any
    box?: PropsBox
  }[]
}) {
  return (
    <Box flexDirection='row' key={Key(props.data)}>
      {
        props.data.map((item, index) => {
          return (
            <Box
              key={Key(item) + index}
              width={item.width}
              {...{
                marginRight: -1,
                borderStyle: border.draw({
                  left: border.left,
                  right: border.right,
                }),
                /** debug column gap issue */
                // borderLeftColor: 'blue',
                // borderRightColor: 'red',
                borderTop: false,
                borderBottom: false,
                ...item.box
              }}
            >
              <Text {...item.textConfig}>{item.value}</Text>
            </Box>
          )
        })
      }
    </Box>
  )
}

const rcTable = (props: ConfigRcTable) => <Table {...props} />

export { rcTable }
