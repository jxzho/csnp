import pc from 'picocolors'

export const Log = {
  info: (...args: any[]) => {
    return console.log.apply(null, args.map(pc.yellow))
  },
  success: (...args: any[]) => {
    return console.log.apply(null, args.map(pc.green))
  },
  error: (...args: any[]) => {
    return console.log.apply(null, args.map(pc.red))
  }
}
