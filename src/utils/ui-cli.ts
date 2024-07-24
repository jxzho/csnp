export const Border = {
	topLeft: '┌',
  topLeftRound: '╭',
	topRight: '┐',
  topRightRound: '╮',
	bottomRight: '┘',
  bottomRightRound: '╯',
	bottomLeft: '└',
  bottomLeftRound: '╰',
  top: '─',
  bottom: '─',
	left: '│',
	right: '│',
  leftCross: '├',
  rightCross: '┤',
  topCross: '┬',
  cross: '┼',
  bottomCross: '┴'
}

export const border = {
  ...Border,
  draw: (config: Partial<typeof Border>) => {
    const defaultConfig = Object.keys(Border).reduce((pre, cur) => {
      pre[cur] = ''
      return pre
    }, {} as any)
    return Object.assign(defaultConfig, config)
  }
}
