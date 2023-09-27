import { lightYellow, lightGreen, lightRed } from 'kolorist'

export const Log = {
  info: (...args: any[]) => {
    return console.log.apply(null, args.map(lightYellow))
  },
  success: (...args: any[]) => {
    return console.log.apply(null, args.map(lightGreen))
  },
  error: (...args: any[]) => {
    return console.log.apply(null, args.map(lightRed))
  }
}
