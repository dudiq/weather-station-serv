import type { WeatherForecastValueObject } from '../../../../core/value-objects/weather-forecast.value-object'
import { getWeatherKey } from '../units/get-weather-key'

export function accuWeatherForecastMapper(
  node: any
): WeatherForecastValueObject[] {
  return node.DailyForecasts.map((node: any) => {
    return {
      datetime: new Date(node.EpochDate * 1000),
      temp: {
        min: node.Temperature.Minimum.Value,
        max: node.Temperature.Maximum.Value,
      },
      sun: {
        riseDate: new Date(node.Sun.EpochRise * 1000),
        setDate: new Date(node.Sun.EpochSet * 1000),
      },
      moon: {
        riseDate: new Date(node.Moon.EpochRise * 1000),
        setDate: new Date(node.Moon.EpochSet * 1000),
        phase: node.Moon.Phase,
        age: node.Moon.Age,
      },
      airQuality: node.AirAndPollen.find((el: any) => el.Name === 'AirQuality')
        ?.Value,
      day: {
        weatherName: getWeatherKey(Number(node.Day.Icon)),
        precipitationProbably: node.Day.PrecipitationProbability,
        solarIrradiance: node.Day.solarIrradiance,
      },
      night: {
        weatherName: getWeatherKey(Number(node.Night.Icon)),
        precipitationProbably: node.Night.PrecipitationProbability,
        solarIrradiance: node.Night.solarIrradiance,
      },
    }
  })
}
