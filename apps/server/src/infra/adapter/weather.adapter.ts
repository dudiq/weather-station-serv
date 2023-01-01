import type { PromiseResult } from '@local-weather/result'
import { isErr, resultErr, resultOk } from '@local-weather/result'
import type { WeatherValueObject } from '../../core/value-objects/weather.value-object'
import type { WeatherForecastValueObject } from '../../core/value-objects/weather-forecast.value-object'
import type { WeatherAdapterErrorsInstances } from '../../core/errors'
import { WeatherAdapterErrors } from '../../core/errors'
import { accuWeatherCurrentAdapter } from './accu/weather-current/accu.weather-current.adapter'
import { accuWeatherForecastAdapter } from './accu/weather-forecast/accu.weather-forecast.adapter'

type ResultWeather = {
  current: WeatherValueObject
  forecast: WeatherForecastValueObject[]
}

export async function getWeatherAdapter(): PromiseResult<
  ResultWeather,
  WeatherAdapterErrorsInstances
> {
  try {
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

    return resultOk({
      current: currentResult.data,
      forecast: forecastResult.data,
    })
  } catch (e: unknown) {
    const err = new WeatherAdapterErrors.GetWeatherUnexpected(e)
    return resultErr(err)
  }
}
