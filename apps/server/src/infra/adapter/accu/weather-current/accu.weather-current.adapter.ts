import type { PromiseResult } from '@local-weather/result'
import { resultErr, resultOk } from '@local-weather/result'
import type { WeatherAdapterErrorsInstances } from '../../../../core/errors'
import { WeatherAdapterErrors } from '../../../../core/errors'
import type { WeatherValueObject } from '../../../../core/value-objects/weather.value-object'
// import { result } from './current.example'
import { fetchRequest } from '../../../service/fetch-request'
import { accuWeatherCurrentMapper } from './accu.weather-current.mapper'

export async function accuWeatherCurrentAdapter(): PromiseResult<
  WeatherValueObject,
  WeatherAdapterErrorsInstances
> {
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

    return resultOk(accuWeatherCurrentMapper(node))
  } catch (e: unknown) {
    return resultErr(new WeatherAdapterErrors.GetWeatherRequest(e))
  }
}
