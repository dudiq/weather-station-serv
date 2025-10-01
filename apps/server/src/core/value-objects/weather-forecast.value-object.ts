import type { WeatherNameEntity } from '../entities/weather-name.entity'

type Portion = {
  weatherName: WeatherNameEntity
  precipitationProbably?: number // percent
  solarIrradiance?: number // W/m²
}

export type MoonPhaseEntity =
  | 'WaningGibbous'
  | 'Last' // LastQuarter
  | 'WaningCrescent'
  | 'New' // NewMoon
  | 'WaxingCrescent'
  | 'First' // FirstQuarter
  | 'WaxingGibbous'
  | 'Full' // FullMoon

export type WeatherForecastValueObject = {
  datetime: Date
  temp: {
    min: number
    max: number
  }
  day: Portion

  //optional
  sun?: {
    riseDate: Date
    setDate: Date
  }
  moon?: {
    riseDate: Date
    setDate: Date
    phase: MoonPhaseEntity
    age: number
  }
  airQuality?: number
  night?: Portion
}
