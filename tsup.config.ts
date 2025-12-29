import { defineConfig } from 'tsup'
import { copyFile, mkdir } from "node:fs/promises"

export default defineConfig({
  entry: ['src/scripts/start.ts'],
  format: ['esm'],
  minify: true,
  clean: true,
  shims: true,
  banner: {
    js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`
  },
  target: 'node18',
  outDir: 'dist',
  external: ['react-devtools-core'],
  onSuccess: async () => {
    await mkdir("./dist/", { recursive: true })
    await copyFile("./node_modules/yoga-wasm-web/dist/yoga.wasm", "./dist/yoga.wasm")
  }
})
