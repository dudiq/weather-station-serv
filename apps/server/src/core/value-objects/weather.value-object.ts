import type { WeatherNameEntity } from '../entities/weather-name.entity'
import type { PressureTendencyValueObject } from './pressure-tendency.value-object'

export type WeatherValueObject = {
  datetime: Date
  weatherName: WeatherNameEntity
  weatherDescription: string
  temp: {
    current: number // celsius
    feelsLike?: number // celsius
  }
  hum: {
    outdoor: number // percent
    indoor?: number // percent, not necessary
  }
  wind: {
    degrees: number // degrees,
    speed: number // km/h
    gustSpeed?: number // meters per seconds, not necessary
  }
  uvindex?: number // see sun uvindex
  cloudCover?: number // percentage
  pressure: {
    value: number // mmHg
    tendency?: PressureTendencyValueObject
  }

  // not necessary
  isDayTime?: boolean
  visibility?: number // meters
  dewPoint?: number
}
