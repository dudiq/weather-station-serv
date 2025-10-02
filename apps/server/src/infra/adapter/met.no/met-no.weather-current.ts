import {WeatherAdapterErrors} from '@lw/core/errors'
import {fetchRequest} from '@lw/infra/service/fetch-request'
import {resultErr, resultOk} from '@repo/result'
import ms, {StringValue} from 'ms'

import {CacheFile} from '../../cache-file'

import {MetNoWeatherValueObject} from "./types/met-no-weather.value-object";
import {getForecastDays} from "./get-forecast-days";
import {metNoWeatherCurrentMapper} from './met-no.weather-current.mapper'

import type {WeatherAdapterErrorsInstances} from '@lw/core/errors'
import type {WeatherValueObject} from '@lw/core/value-objects/weather.value-object'
import type {WeatherForecastValueObject} from "@lw/core/value-objects/weather-forecast.value-object";
import type {PromiseResult} from '@repo/result'

const ttlValue = process.env.WX_CACHE_TTL as (StringValue | undefined)
  || '1 hour'
const TTL = ms(ttlValue)

const cache = new CacheFile<MetNoWeatherValueObject>('met-no.weather-result.cache.json', {
  ttl: TTL,
})

function getTtl(res: Response) {
  const expiresDate = res.headers.get('expires') || res.headers.get('Expires')
  if (!expiresDate) return TTL

  const newTtl = Math.abs((new Date(expiresDate)).getTime() - Date.now())
  if (newTtl < TTL) return TTL

  return newTtl
}

export async function metNoWeatherCurrentAdapter(): PromiseResult<
  { current: WeatherValueObject, forecast: WeatherForecastValueObject[] },
  WeatherAdapterErrorsInstances
> {
  const cacheValue = cache.isExpired ? undefined : cache.getValue()

  if (cacheValue?.content) {
    console.log('-return cached current weather value')
    return resultOk({
      current: metNoWeatherCurrentMapper(cacheValue?.content.properties.timeseries),
      forecast: getForecastDays(cacheValue?.content.properties.timeseries)
    })
  }

  try {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${process.env.WX_LAT}&lon=${process.env.WX_LON}`
    const res = await fetch(url, {
      headers: {
        'User-Agent': `${process.env.WX_USER_AGENT}`,
      },
    })

    const nextTtl = getTtl(res)

    const result = await res.json() as MetNoWeatherValueObject

    if (!('properties' in result)) {
      return resultErr(new WeatherAdapterErrors.GetWeatherRequest(result))
    }

    const resultMapped = {
      current: metNoWeatherCurrentMapper(result.properties.timeseries),
      forecast: getForecastDays(result.properties.timeseries)
    }
    cache.setTtl(nextTtl)
    cache.setValue(result)
    return resultOk(resultMapped)
  } catch (e: unknown) {
    return resultErr(new WeatherAdapterErrors.GetWeatherRequest(e))
  }
}
