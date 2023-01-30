const platform = process.platform

module.exports = {
  Mac: platform === 'darwin',
  Win: ['win32', 'win64'].includes(platform),
  Linux: platform === 'linux'
}
