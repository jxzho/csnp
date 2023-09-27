const platform = process.platform

export const Platform = {
  Mac: platform === 'darwin',
  Win: ['win32', 'win64'].includes(platform),
  Linux: platform === 'linux'
}
