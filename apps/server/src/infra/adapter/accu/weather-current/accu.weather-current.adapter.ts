import ms from 'ms'
import type { PromiseResult } from '@repo/result'
import { resultErr, resultOk } from '@repo/result'
import type { WeatherAdapterErrorsInstances } from '../../../../core/errors'
import { WeatherAdapterErrors } from '../../../../core/errors'
import type { WeatherValueObject } from '../../../../core/value-objects/weather.value-object'
// import { result } from './current.example'
import { fetchRequest } from '../../../service/fetch-request'
import { CacheFile } from '../../../cache-file'
import { accuWeatherCurrentMapper } from './accu.weather-current.mapper'

const cache = new CacheFile<unknown>('weather-current.cache.json', {
  ttl: ms(`${process.env.WX_CACHE_TTL}`),
})

export async function accuWeatherCurrentAdapter(): PromiseResult<
  WeatherValueObject,
  WeatherAdapterErrorsInstances
> {
  const cacheValue = cache.checkExpire() ? cache.getValue() : undefined

  if (cacheValue?.content) {
    console.log('-return cached current weather value')
    const resultMapped = accuWeatherCurrentMapper(cacheValue?.content)
    return resultOk(resultMapped)
  }
  try {
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${process.env.WX_PLACE}.json?apikey=${process.env.WX_TOKEN_KEY}&language=${process.env.WX_LOCALE}&details=true&metric=true`
    const result = await fetchRequest<any>(url)

    if ('Code' in result) {
      return resultErr(new WeatherAdapterErrors.GetWeatherRequest(result))
    }

    if (!Array.isArray(result)) {
      return resultErr(
        new WeatherAdapterErrors.GetWeatherRequest('not an array')
      )
    }

    if (result.length === 0) {
      return resultErr(new WeatherAdapterErrors.WeatherPlace())
    }

    const node = result[0]
    console.log('-save value to cache')
    cache.setValue(node)
    const resultMapped = accuWeatherCurrentMapper(node)
    return resultOk(resultMapped)
  } catch (e: unknown) {
    return resultErr(new WeatherAdapterErrors.GetWeatherRequest(e))
  }
}
