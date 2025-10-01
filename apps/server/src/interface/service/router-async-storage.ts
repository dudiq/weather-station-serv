import { AsyncLocalStorage } from 'async_hooks'

import type { WeatherValueObject } from '@lw/core/value-objects/weather.value-object'
import type { WeatherForecastValueObject } from '@lw/core/value-objects/weather-forecast.value-object'

export type SharedRoutesStorage = {
  sleepSeconds: number
  weather: {
    current: WeatherValueObject
    forecast: WeatherForecastValueObject[]
  }
}

export const routerAsyncStorage = new AsyncLocalStorage<SharedRoutesStorage>()
