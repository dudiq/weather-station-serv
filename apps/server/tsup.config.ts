import { defineConfig } from 'tsup'

export default defineConfig({
  dts: true,
  entry: {
    index: './src/app.ts',
  },
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm'],
})
