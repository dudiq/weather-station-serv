import { getMeterDistanceValue } from '../units/get-meter-distance-value'
import { getMgMercury } from '../../../service/get-mg-mercury'
import { getSpeed } from '../units/get-speed'
import { getTendencyPressure } from '../units/get-tendency-pressure'
import { getWeatherKey } from '../units/get-weather-key'

import type { WeatherValueObject } from '@lw/core/value-objects/weather.value-object'

export function accuWeatherCurrentMapper(node: any): WeatherValueObject {
  return {
    datetime: new Date(node.EpochTime * 1000),
    weatherDescription: node.WeatherText,
    weatherName: getWeatherKey(Number(node.WeatherIcon)),
    isDayTime: !!node.isDayTime,
    temp: {
      current: Number(node.Temperature.Metric.Value),
      feelsLike: Number(node.RealFeelTemperature.Metric.Value),
    },
    hum: {
      outdoor: Number(node.RelativeHumidity),
      indoor: Number(node.IndoorRelativeHumidity),
    },
    dewPoint: Number(node.DewPoint.Metric.Value),
    wind: {
      degrees: Number(node.Wind.Direction.Degrees),
      speed: getSpeed(
        Number(node.Wind.Speed.Metric.Value),
        Number(node.Wind.Speed.Metric.UnitType),
        'ms'
      ),
      gustSpeed: getSpeed(
        Number(node.WindGust.Speed.Metric.Value),
        Number(node.WindGust.Speed.Metric.UnitType),
        'ms'
      ),
    },
    uvindex: Number(node.UVIndex),
    visibility: getMeterDistanceValue(
      Number(node.Visibility.Metric.Value),
      Number(node.Visibility.Metric.UnitType)
    ),
    cloudCover: Number(node.CloudCover),
    pressure: {
      value: Math.floor(getMgMercury(Number(node.Pressure.Metric.Value))),
      tendency: getTendencyPressure(node.PressureTendency.Code),
    },
  }
}
