import {getMgMercury} from "@lw/infra/service/get-mg-mercury";

import {getFeelsLikeTemp} from "./units/get-feels-like-temp";
import {getWeatherDetails} from "./units/get-weather-details";
import {getWeatherSymbol} from "./units/get-weather-symbol";

import type {WeatherValueObject} from '@lw/core/value-objects/weather.value-object'
import {MetNoWeatherValueObject} from "@lw/infra/adapter/met.no/types/met-no-weather.value-object";

export function metNoWeatherCurrentMapper(timeSeriesNode: MetNoWeatherValueObject['properties']['timeseries'][0]): WeatherValueObject {
  const weatherValue = timeSeriesNode.data.next_1_hours?.summary.symbol_code
    || timeSeriesNode.data.next_6_hours?.summary.symbol_code
    || timeSeriesNode.data.next_12_hours?.summary.symbol_code

  const details = timeSeriesNode.data.instant.details

  return {
    datetime: new Date(timeSeriesNode.time),
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
