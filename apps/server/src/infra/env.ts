import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenvExpand = require('dotenv-expand').expand

const allPath = [
  { file: '.env.development.local', type: 'dev' },
  { file: '.env.development', type: 'dev' },
  { file: '.env.local', type: 'dev' },
  { file: '.env', type: 'prod' },
]

const envFolder = ''

function initEnv() {
  const usedType =
    process.env.NODE_ENV === 'production' ? ['prod'] : ['prod', 'dev']
  const usedPaths = allPath.filter((node) => usedType.includes(node.type))

  console.log('usedPaths', usedPaths)
  usedPaths.forEach(function (node) {
    const resolvedPath = path.resolve(`${envFolder}${node.file}`)
    console.log('resolvedPath', resolvedPath)
    dotenvExpand(dotenv.config({ path: resolvedPath }))
  })

  console.log('[env] -----------------')
  console.log(`[env] using NODE_ENV: ${process.env.NODE_ENV}`)
  console.log(`[env] using WX_HOST: ${process.env.WX_HOST}`)
  console.log(`[env] using WX_PORT: ${process.env.WX_PORT}`)
  console.log(`[env] using WX_PLACE: ${process.env.WX_PLACE}`)
  console.log(`[env] using folder: ${path.resolve(envFolder)}`)
  console.log('[env] -----------------')
}

initEnv()
