import type { KeyOfErrors } from '@repo/errors'
import { errorFactory } from '@repo/errors'

export const { WeatherAdapterErrors } = errorFactory('WeatherAdapterErrors', {
  GetWeatherParse: 'Error while parsing weather result',
  GetWeatherRequest: 'Error while getting weather result',
  WeatherPlace: 'Pleace check place id for getting weather',
  GetWeatherUnexpected: 'Unexpected Error while getting wether result',
})

export type WeatherAdapterErrorsInstances = InstanceType<
  KeyOfErrors<typeof WeatherAdapterErrors>
>
