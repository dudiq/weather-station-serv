import type { WeatherNameEntity } from '../entities/weather-name.entity'
import type { PressureTendencyValueObject } from './pressure-tendency.value-object'

export type WeatherValueObject = {
  datetime: Date
  weatherName: WeatherNameEntity
  weatherDescription: string
  isDayTime: boolean
  temp: {
    current: number // celsius
    feelsLike?: number // celsius
  }
  hum: {
    outdoor: number // percent
    indoor?: number // percent
  }
  dewPoint: number
  wind: {
    degrees: number // degrees,
    speed: number // km/h
    gustSpeed?: number // meters per seconds
  }
  uvindex?: number // see sun uvindex
  visibility?: number // meters
  cloudCover?: number // percentage
  pressure: {
    value: number // mmHg
    tendency?: PressureTendencyValueObject
  }
}
