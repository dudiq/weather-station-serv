import type { IncomingMessage, ServerResponse } from 'http'
import { isErr } from '@repo/result'
import { appBlock } from '../../ui/app.block'
import { getWeatherAdapter } from '../../infra/adapter/weather.adapter'
import { serverAnswer } from '../../infra/service/server-answer'
import { getSleepSeconds } from '../service/get-sleep-seconds'
import type { DeviceResultRequest } from '../../core/device/device-result-request'
import { routerAsyncStorage } from '../service/router-async-storage'

const WAKEUP_HOURS: number[] = (() => {
  const defaultHours = [5, 11, 14, 17, 20, 23]

  const envHours = process.env.WX_WAKEUP_HOURS

  if (!envHours) return defaultHours

  try {
    const hoursFromEnv = JSON.parse(envHours) as number[]
    if (Array.isArray(hoursFromEnv)) return hoursFromEnv
    return defaultHours
  } catch (e: unknown) {
    return defaultHours
  }
})()

console.log('WAKEUP_HOURS', WAKEUP_HOURS)

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

  const sleepSeconds = getSleepSeconds(new Date(), WAKEUP_HOURS)

  const store = {
    sleepSeconds,
    weather: {
      current: weatherResult.data.current,
      forecast: weatherResult.data.forecast,
    },
  }

  await routerAsyncStorage.run(store, async () => {
    const renderResult = appBlock()

    // should be less 64kb
    const result: DeviceResultRequest = {
      sleepSeconds,
      isDev: false,
      blocks: {
        total: renderResult.length,
        items: renderResult,
      },
      devSleep: 1000 * 60 * 10, // 10 minutes
    }

    serverAnswer(res, result)
  })
}
