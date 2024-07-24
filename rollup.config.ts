import { copyFile, mkdir } from "node:fs/promises"
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'

// copy yoga wasm file
await mkdir("./dist/", { recursive: true })
await copyFile("./node_modules/yoga-wasm-web/dist/yoga.wasm", "./dist/yoga.wasm")

export default defineConfig({
  input: {
    start: 'src/scripts/start.ts'
  },
  output: {
    format: 'es',
    dir: 'dist'
  },
  plugins: [
    typescript(),
    json(),
    commonjs({
      ignoreDynamicRequires: false
    }),
    nodeResolve({
      exportConditions: ['node'],
    }),
    terser()
  ],
  external: [
    'react-devtools-core'
  ],
  onwarn (warning, warn) {
    // mute gray-matter use `eval` warning
    if (warning.code === 'EVAL') return
    warn(warning)
  }
})
