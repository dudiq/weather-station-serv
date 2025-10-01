import { routesManager } from './routes-manager'

import type { IncomingMessage, ServerResponse } from 'http'

export async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const routesList = routesManager.getRoutes()

  console.log('-req', {
    url: req.url,
    method: req.method,
  })

  const usedRoutes = routesList.filter((route) => {
    if (route.method !== req.method) return false
    if (route.path !== req.url) return false
    return true
  })

  if (usedRoutes.length === 0) {
    res.setHeader('Content-Type', 'application/json')

    // should be less 64k
    res.writeHead(200)
    res.end(
      JSON.stringify({
        message: 'not defined path',
      })
    )
    return
  }

  const promisesList = usedRoutes.map((route) => route.callback(req, res))
  await Promise.all(promisesList)
}
