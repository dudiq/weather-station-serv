import type { ServerResponse } from 'http'

export function serverAnswer(res: ServerResponse, data: any, code?: number) {
  res.writeHead(code || 200)

  console.log('-handle request:', data)

  const answer = JSON.stringify(data)
  res.end(answer)
}
