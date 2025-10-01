import {extractDayData} from "./units/extract-day-data";
import {getWeatherSymbol} from "./units/get-weather-symbol";

import type {WeatherForecastValueObject} from "@lw/core/value-objects/weather-forecast.value-object";
import type {MetNoWeatherValueObject} from "./types/met-no-weather.value-object";

export function getForecastDays(timeseries: MetNoWeatherValueObject['properties']['timeseries']): WeatherForecastValueObject[] {
  const daysData = extractDayData(timeseries)
  return daysData.map(dayData => {
    const timeSeriesNode = dayData.day
    const weatherValue = timeSeriesNode.data.next_1_hours?.summary.symbol_code
      || timeSeriesNode.data.next_6_hours?.summary.symbol_code
      || timeSeriesNode.data.next_12_hours?.summary.symbol_code

    return {
      datetime: dayData.datetime,
      day: {
        weatherName: getWeatherSymbol(weatherValue)
      },
      temp: {
        max: dayData.temp.max,
        min: dayData.temp.min,
      }
    }
  })
}
