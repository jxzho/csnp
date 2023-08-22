const { lightYellow, lightGreen, lightRed } = require('kolorist')

module.exports = {
  log: {
    info: (...args) => {
      return console.log.apply(null, args.map(lightYellow))
    },
    success: (...args) => {
      return console.log.apply(null, args.map(lightGreen))
    },
    error: (...args) => {
      return console.log.apply(null, args.map(lightRed))
    }
  }
}
