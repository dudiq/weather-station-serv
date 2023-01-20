import path from 'path'
import fs from 'fs'

// eslint-disable-next-line eslint-comments/no-restricted-disable
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')

// eslint-disable-next-line eslint-comments/no-restricted-disable
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenvExpand = require('dotenv-expand').expand

const allPath = [
  { file: '.env.development.local', type: 'dev' },
  { file: '.env.development', type: 'dev' },
  { file: '.env.local', type: 'prod' },
  { file: '.env', type: 'prod' },
]

const MAX_LEVELS = 10

function getUsedPaths(): { file: string; type: string }[] {
  const usedType =
    process.env.NODE_ENV === 'production' ? ['prod'] : ['prod', 'dev']

  const usedPaths = allPath.filter((node) => usedType.includes(node.type))

  console.log('usedPaths', usedPaths)
  return usedPaths
}

function getEnvFolderLocation(level: number, paths: string[]): string {
  if (level > MAX_LEVELS) return '.'
  const parentFolder = new Array(level).fill('../').join('')
  const checkPaths = paths.map((path) => `${parentFolder}${path}`)
  const isFounded = checkPaths.find((filePath) => fs.existsSync(filePath))
  if (isFounded) return parentFolder
  return getEnvFolderLocation(level + 1, paths)
}

function initEnv(): void {
  const usedPaths = getUsedPaths()

  const usedFolder = getEnvFolderLocation(
    0,
    usedPaths.map((node) => node.file)
  )

  usedPaths.forEach(function (node) {
    const resolvedPath = path.resolve(`${usedFolder}${node.file}`)
    console.log('resolvedPath', resolvedPath)
    dotenvExpand(dotenv.config({ path: resolvedPath }))
  })

  console.log('[env] -----------------')
  console.log(`[env] using NODE_ENV: ${process.env.NODE_ENV}`)
  console.log(`[env] using WX_HOST: ${process.env.WX_HOST}`)
  console.log(`[env] using WX_PORT: ${process.env.WX_PORT}`)
  console.log(`[env] using WX_PLACE: ${process.env.WX_PLACE}`)
  console.log(`[env] using WX_LOCALE: ${process.env.WX_LOCALE}`)
  console.log(`[env] using WX_LOCALE: ${process.env.WX_CACHE_TTL}`)
  console.log(`[env] using folder: ${path.resolve(usedFolder)}`)
  console.log('[env] -----------------')
}

initEnv()
