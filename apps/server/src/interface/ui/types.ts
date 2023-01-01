import type { WeatherValueObject } from '../../core/value-objects/weather.value-object'
import type { WeatherForecastValueObject } from '../../core/value-objects/weather-forecast.value-object'
import type { DeviceItem } from '../../core/device/device-result-request'

export type BlockProps = {
  current: WeatherValueObject
  forecast: WeatherForecastValueObject[]
}

export type BlockResult = DeviceItem[]
