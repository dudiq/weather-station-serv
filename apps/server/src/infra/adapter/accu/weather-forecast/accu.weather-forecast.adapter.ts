import ms from 'ms'
import type { PromiseResult } from '@local-weather/result'
import { resultErr, resultOk } from '@local-weather/result'
import type { WeatherAdapterErrorsInstances } from '../../../../core/errors'
import { WeatherAdapterErrors } from '../../../../core/errors'
import { fetchRequest } from '../../../service/fetch-request'
import type { WeatherForecastValueObject } from '../../../../core/value-objects/weather-forecast.value-object'
// import { forecastResult } from './accu.forecast.example'
import { CacheFile } from '../../../cache-file'
import { accuWeatherForecastMapper } from './accu.weather-forecast.mapper'

const cache = new CacheFile<unknown>('weather-forecast.cache.json', {
  ttl: ms(`${process.env.WX_CACHE_TTL}`),
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
