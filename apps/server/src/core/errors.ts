import type { KeyOfErrors } from '@local-weather/errors'
import { errorFactory } from '@local-weather/errors'

export const { WeatherAdapterErrors } = errorFactory('WeatherAdapterErrors', {
  GetWeatherParse: 'Error while parsing weather result',
  GetWeatherRequest: 'Error while getting weather result',
  WeatherPlace: 'Pleace check place id for getting weather',
  GetWeatherUnexpected: 'Unexpected Error while getting wether result',
})

export type WeatherAdapterErrorsInstances = InstanceType<
  KeyOfErrors<typeof WeatherAdapterErrors>
>
