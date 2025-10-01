import { getWeatherAdapter } from '@lw/infra/adapter/weather.adapter'
import { serverAnswer } from '@lw/infra/service/server-answer'
import {failedWeatherResult} from "@lw/interface/get-weather/failed-weather-result";
import {WAKEUP_HOURS} from "@lw/interface/get-weather/wakeup-hours";
import { appBlock } from '@lw/ui/app.block'
import { isErr } from '@repo/result'

import { getSleepSeconds } from '../interface/service/get-sleep-seconds'
import { routerAsyncStorage } from '../interface/service/router-async-storage'

import type { DeviceResultRequest } from '@lw/core/device/device-result-request'
import type { IncomingMessage, ServerResponse } from 'http'

console.log('WAKEUP_HOURS', WAKEUP_HOURS)

const DEV_SLEEP=  1000 * 60 * 10 // 10 minutes

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
  const sleepSeconds = getSleepSeconds(new Date(), WAKEUP_HOURS)

  const weatherResult = await getWeatherAdapter()
  console.log('---weatherResult', weatherResult)
  if (isErr(weatherResult)) {
    console.error('weather-get-failed', {
      weatherResult
    })
    serverAnswer(res, failedWeatherResult())
    return
  }

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
      devSleep: DEV_SLEEP,
    }

    serverAnswer(res, result)
  })
}
