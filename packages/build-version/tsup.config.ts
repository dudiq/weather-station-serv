import { defineConfig } from 'tsup'

const rootJson = require('../../package.json')

const appVersion = rootJson.version

console.log('appVersion', appVersion)

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  define: {
    'process.env._TIME_ENTRY_': String(Date.now()),
    'process.env.GITHUB_SHA': `"${process.env.GITHUB_SHA}"` || '"_"',
    'process.env.TZ': `"${process.env.TZ}"` || '"_"',
    'process.env.VERCEL_GIT_COMMIT_SHA':
      `"${process.env.VERCEL_GIT_COMMIT_SHA}"` || '"_"',
    'process.env.VERCEL_ENV': `"${process.env.VERCEL_ENV}"` || '"_"',
    'process.env._APP_VERSION_': `"${String(appVersion)}"`,
  },
})
