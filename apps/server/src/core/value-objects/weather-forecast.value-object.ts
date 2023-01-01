import type { WeatherNameEntity } from '../entities/weather-name.entity'

type Portion = {
  weatherName: WeatherNameEntity
  precipitationProbably: number // percent
  solarIrradiance: number // W/m²
}

export type MoonPhaseEntity =
  | 'WaningGibbous'
  | 'LastQuarter'
  | 'WaningCrescent'
  | 'NewMoon'
  | 'WaxingCrescent'
  | 'FirstQuarter'
  | 'WaxingGibbous'
  | 'FullMoon'

export type WeatherForecastValueObject = {
  datetime: Date
  sun: {
    riseDate: Date
    setDate: Date
  }
  moon: {
    riseDate: Date
    setDate: Date
    phase: MoonPhaseEntity
    age: number
  }
  temp: {
    min: number
    max: number
  }
  airQuality: number
  day: Portion
  night: Portion
}
