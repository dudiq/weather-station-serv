import { WeatherAdapterErrors } from '@lw/core/errors'
// import { forecastResult } from './accu.forecast.example'
import { CacheFile } from '@lw/infra/cache-file'
import { fetchRequest } from '@lw/infra/service/fetch-request'
import { resultErr, resultOk } from '@repo/result'
import ms, {StringValue} from 'ms'

import { accuWeatherForecastMapper } from './accu.weather-forecast.mapper'

import type { WeatherAdapterErrorsInstances } from '@lw/core/errors'
import type { WeatherForecastValueObject } from '@lw/core/value-objects/weather-forecast.value-object'
import type { PromiseResult } from '@repo/result'

const ttl = process.env.WX_CACHE_TTL as StringValue
const cache = new CacheFile<unknown>('weather-forecast.cache.json', {
  ttl: ms(ttl),
})

export async function accuWeatherForecastAdapter(): PromiseResult<
  WeatherForecastValueObject[],
  WeatherAdapterErrorsInstances
> {
  const cacheValue = cache.checkExpire() ? cache.getValue() : undefined

  if (cacheValue?.content) {
    console.log('-return cached forecast weather value')
    const mappedResult = accuWeatherForecastMapper(cacheValue?.content)
    return resultOk(mappedResult)
  }

  try {
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${process.env.WX_PLACE}?apikey=${process.env.WX_TOKEN_KEY}&language=${process.env.WX_LOCALE}&details=true&metric=true`
    console.log('url', url)
    const result = await fetchRequest<any>(url)

    // const result = forecastResult

    if ('Code' in result) {
      return resultErr(new WeatherAdapterErrors.GetWeatherRequest(result))
    }

    cache.setValue(result)
    const mappedResult = accuWeatherForecastMapper(result)
    return resultOk(mappedResult)
  } catch (e: unknown) {
    return resultErr(new WeatherAdapterErrors.GetWeatherRequest(e))
  }
}
