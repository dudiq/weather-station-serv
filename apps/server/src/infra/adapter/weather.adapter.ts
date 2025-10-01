import {WeatherAdapterErrors} from '@lw/core/errors'
import {metNoWeatherCurrentAdapter} from "@lw/infra/adapter/met.no/met-no.weather-current";
import {isErr, resultErr, resultOk} from '@repo/result'

import {accuWeatherCurrentAdapter} from './accu/weather-current/accu.weather-current.adapter'
import {accuWeatherForecastAdapter} from './accu/weather-forecast/accu.weather-forecast.adapter'

import type {WeatherAdapterErrorsInstances} from '@lw/core/errors'
import type {WeatherValueObject} from '@lw/core/value-objects/weather.value-object'
import type {WeatherForecastValueObject} from '@lw/core/value-objects/weather-forecast.value-object'
import type {PromiseResult} from '@repo/result'

type ResultWeather = {
  current: WeatherValueObject
  forecast: WeatherForecastValueObject[]
}

type TProvider = 'met-no' | 'accu'

const provider: TProvider = (process.env.WX_PROVIDER as TProvider | undefined) || 'met-no'

async function getWeatherByProvider(provider: 'met-no' | 'accu') {
  if (provider === 'accu') {
    const [currentResult, forecastResult] = await Promise.all([
      accuWeatherCurrentAdapter(),
      accuWeatherForecastAdapter(),
    ])
    if (isErr(currentResult)) {
      return resultErr(currentResult.error)
    }
    if (isErr(forecastResult)) {
      return resultErr(forecastResult.error)
    }

    return resultOk({current: currentResult.data, forecast: forecastResult.data})
  }

  const metNoResult = await metNoWeatherCurrentAdapter()
  if (isErr(metNoResult)) {
    return resultErr(metNoResult.error)
  }

  return resultOk({
    current: metNoResult.data.current,
    forecast: metNoResult.data.forecast,
  })
}

export async function getWeatherAdapter(): PromiseResult<
  ResultWeather,
  WeatherAdapterErrorsInstances
> {
  try {
    const res = await getWeatherByProvider(provider)

    if (isErr(res)) {
      return res
    }

    return resultOk({
      current: res.data.current,
      forecast: res.data.forecast,
    })
  } catch (e: unknown) {
    const err = new WeatherAdapterErrors.GetWeatherUnexpected(e)
    return resultErr(err)
  }
}
