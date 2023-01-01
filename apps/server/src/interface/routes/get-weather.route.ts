import type { IncomingMessage, ServerResponse } from 'http'
import { isErr } from '@local-weather/result'
import { renderBlock } from '../ui/render.block'
import { getWeatherAdapter } from '../../infra/adapter/weather.adapter'
import { serverAnswer } from '../../infra/service/server-answer'
import { getNextWakeupTimeout } from '../service/get-next-wakeup-timeout'
import type { DeviceResultRequest } from '../../core/device/device-result-request'

export async function getWeatherRoute(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  res.setHeader('Content-Type', 'application/json')

  const token = req.headers['a-t']
  const deviceWidth = req.headers['d-w']
  const deviceHeight = req.headers['d-h']
  console.log('--headers', {
    token,
    deviceWidth,
    deviceHeight,
  })

  const weatherResult = await getWeatherAdapter()
  if (isErr(weatherResult)) {
    serverAnswer(res, weatherResult.error)
    return
  }

  const renderResult = await renderBlock(weatherResult.data)
  if (isErr(renderResult)) {
    serverAnswer(res, renderResult.error)
    return
  }

  // should be less 64kb
  const result: DeviceResultRequest = {
    sleepSeconds: getNextWakeupTimeout(),
    isDev: false,
    blocks: {
      total: renderResult.data.length,
      items: renderResult.data,
    },
    devSleep: 1000 * 60 * 10, // 10 minutes
  }

  serverAnswer(res, result)
}
