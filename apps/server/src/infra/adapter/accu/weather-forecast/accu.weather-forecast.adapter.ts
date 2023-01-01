import type { PromiseResult } from '@local-weather/result'
import { resultErr, resultOk } from '@local-weather/result'
import type { WeatherAdapterErrorsInstances } from '../../../../core/errors'
import { WeatherAdapterErrors } from '../../../../core/errors'
import { fetchRequest } from '../../../service/fetch-request'
import type { WeatherForecastValueObject } from '../../../../core/value-objects/weather-forecast.value-object'
// import { forecastResult } from './accu.forecast.example'
import { accuWeatherForecastMapper } from './accu.weather-forecast.mapper'

export async function accuWeatherForecastAdapter(): PromiseResult<
  WeatherForecastValueObject[],
  WeatherAdapterErrorsInstances
> {
  try {
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${process.env.WX_PLACE}?apikey=${process.env.WX_TOKEN_KEY}&language=${process.env.WX_LOCALE}&details=true&metric=true`
    const result = await fetchRequest<any>(url)

    // const result = forecastResult

    if ('Code' in result) {
      return resultErr(new WeatherAdapterErrors.GetWeatherRequest(result))
    }

    return resultOk(accuWeatherForecastMapper(result))
  } catch (e: unknown) {
    return resultErr(new WeatherAdapterErrors.GetWeatherRequest(e))
  }
}
