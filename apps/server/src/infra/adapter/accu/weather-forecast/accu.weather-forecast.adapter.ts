import { resultErr, resultOk } from '@repo/result'
import ms, {StringValue} from 'ms'

import { WeatherAdapterErrors } from '../../../../core/errors'
// import { forecastResult } from './accu.forecast.example'
import { CacheFile } from '../../../cache-file'
import { fetchRequest } from '../../../service/fetch-request'

import { accuWeatherForecastMapper } from './accu.weather-forecast.mapper'

import type { PromiseResult } from '@repo/result'
import type { WeatherAdapterErrorsInstances } from '../../../../core/errors'
import type { WeatherForecastValueObject } from '../../../../core/value-objects/weather-forecast.value-object'

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
