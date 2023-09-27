import { defineBuildConfig } from 'unbuild'
import fs from 'node:fs'
import { parse, join } from 'node:path'

export default defineBuildConfig({
  entries: [
    ...fs.readdirSync('./src/scripts', 'utf-8')
      .filter(file => parse(file).ext === '.ts')
      .map(filename => (
        {
          input: join('./src/scripts', filename),
          name: filename.slice(0, -3)
        }
      ))
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true
  }
})
