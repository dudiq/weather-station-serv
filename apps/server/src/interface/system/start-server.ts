import {registerRoutes} from '@lw/routes/register-routes'
import { createServer } from 'http'

import type { IncomingMessage, ServerResponse } from 'http'

const host = String(process.env.WX_HOST)
const port = Number(process.env.WX_PORT)

export function startServer(
  handler: (req: IncomingMessage, res: ServerResponse) => void
) {
  registerRoutes()
  const server = createServer(handler)
  const serverPath = `${host}:${port}`
  server.listen(port, host, () => {
    console.log(`Server is running on http://${serverPath}`)
  })
}
