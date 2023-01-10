const { yellow, lightGreen, red } = require('kolorist')

module.exports = {
  log: {
    info: (...args) => {
      return console.log.apply(null, args.map(yellow))
    },
    success: (...args) => {
      return console.log.apply(null, args.map(lightGreen))
    },
    error: (...args) => {
      return console.log.apply(null, args.map(red))
    }
  }
}
