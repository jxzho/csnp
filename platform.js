const platform = process.platform

module.exports = {
  Mac: platform === 'darwin',
  Win: platform === 'win32' || platform === 'win64',
  Linux: platform === 'linux'
}
