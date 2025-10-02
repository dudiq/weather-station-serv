import {getMgMercury} from "@lw/infra/service/get-mg-mercury";

import {MetNoWeatherValueObject} from "./types/met-no-weather.value-object";
import {getFeelsLikeTemp} from "./units/get-feels-like-temp";
import {getWeatherDetails} from "./units/get-weather-details";
import {getWeatherSymbol} from "./units/get-weather-symbol";

import type {WeatherValueObject} from '@lw/core/value-objects/weather.value-object'

export function metNoWeatherCurrentMapper(timeSeries: MetNoWeatherValueObject['properties']['timeseries']): WeatherValueObject {
  const now = Date.now();
  const closestTimeSeries = timeSeries.reduce((res, series) => {
    const nextSeriesDx = (new Date(series.time).getTime()) - now
    const currentSeriesDx = (new Date(res.time).getTime()) - now
    return nextSeriesDx< currentSeriesDx ? series : res
  }, timeSeries[0])

  const weatherValue = closestTimeSeries.data.next_1_hours?.summary.symbol_code
    || closestTimeSeries.data.next_6_hours?.summary.symbol_code
    || closestTimeSeries.data.next_12_hours?.summary.symbol_code

  const details = closestTimeSeries.data.instant.details

  return {
    datetime: new Date(closestTimeSeries.time),
    weatherDescription: getWeatherDetails(weatherValue),
    weatherName: getWeatherSymbol(weatherValue),
    temp: {
      current: Number(details.air_temperature),
      feelsLike: Math.floor(getFeelsLikeTemp(details.air_temperature, details.wind_speed, details.relative_humidity).value * 10) / 10
    },
    hum: {
      outdoor: Number(details.relative_humidity),
      // indoor: Number(node.IndoorRelativeHumidity),
    },
    // dewPoint: Number(node.DewPoint.Metric.Value),
    wind: {
      degrees: Number(details.wind_from_direction),
      speed: Number(details.wind_speed),
      // gustSpeed: getSpeed(
      //   Number(node.WindGust.Speed.Metric.Value),
      //   Number(node.WindGust.Speed.Metric.UnitType),
      //   'ms'
      // ),
    },
    // uvindex: Number(node.UVIndex),
    // visibility: getMeterDistanceValue(
    //   Number(node.Visibility.Metric.Value),
    //   Number(node.Visibility.Metric.UnitType)
    // ),
    cloudCover: Number(details.cloud_area_fraction),
    pressure: {
      value: Math.floor(getMgMercury(Number(details.air_pressure_at_sea_level))),
      // tendency: getTendencyPressure(node.PressureTendency.Code),
    },
  }
}
