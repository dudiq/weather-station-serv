import {MetNoWeatherSymbolValueObject} from "../types/met-no-weather-symbol-value-object";

import type {WeatherNameEntity} from "@lw/core/entities/weather-name.entity";

const weatherSymbolToWeatherNameMap: Record<MetNoWeatherSymbolValueObject, WeatherNameEntity> = {
  clearsky_day: 'sunny',
  clearsky_night: 'moon',
  clearsky_polartwilight: 'sunny',

  fair_day: 'sun-cloudy',
  fair_night: 'moon-cloudy',
  fair_polartwilight: 'sun-cloudy',

  lightssnowshowersandthunder_day: 'storm-cloudy',
  lightssnowshowersandthunder_night: 'night-storm',
  lightssnowshowersandthunder_polartwilight: 'storm-cloudy',

  lightsnowshowers_day: 'flurries',
  lightsnowshowers_night: 'night-flurries',
  lightsnowshowers_polartwilight: 'flurries',

  heavyrainandthunder: 'storm',
  heavysnowandthunder: 'storm',
  rainandthunder: 'storm',

  heavysleetshowersandthunder_day: 'storm-cloudy',
  heavysleetshowersandthunder_night: 'night-storm',
  heavysleetshowersandthunder_polartwilight: 'storm-cloudy',

  heavysnow: 'snow',

  heavyrainshowers_day: 'shower',
  heavyrainshowers_night: 'night-shower',
  heavyrainshowers_polartwilight: 'shower',

  lightsleet: 'sleet',

  heavyrain: 'rain',

  lightrainshowers_day: 'shower',
  lightrainshowers_night: 'night-shower',
  lightrainshowers_polartwilight: 'shower',

  heavysleetshowers_day: 'sleet',
  heavysleetshowers_night: 'sleet',
  heavysleetshowers_polartwilight: 'sleet',

  lightsleetshowers_day: 'sleet',
  lightsleetshowers_night: 'sleet',
  lightsleetshowers_polartwilight: 'sleet',

  snow: 'snow',

  heavyrainshowersandthunder_day: 'storm-cloudy',
  heavyrainshowersandthunder_night: 'night-storm',
  heavyrainshowersandthunder_polartwilight: 'storm-cloudy',

  snowshowers_day: 'snow',
  snowshowers_night: 'night-snow',
  snowshowers_polartwilight: 'snow',

  fog: 'fog',

  snowshowersandthunder_day: 'storm-cloudy',
  snowshowersandthunder_night: 'night-storm',
  snowshowersandthunder_polartwilight: 'storm-cloudy',

  lightsnowandthunder: 'storm-cloudy',
  heavysleetandthunder: 'storm-cloudy',

  lightrain: 'rain',

  rainshowersandthunder_day: 'storm-cloudy',
  rainshowersandthunder_night: 'night-storm',
  rainshowersandthunder_polartwilight: 'storm-cloudy',

  rain: 'rain',

  lightsnow: 'flurries',

  lightrainshowersandthunder_day: 'storm-cloudy',
  lightrainshowersandthunder_night: 'night-storm',
  lightrainshowersandthunder_polartwilight: 'storm-cloudy',

  heavysleet: 'sleet',

  sleetandthunder: 'storm-cloudy',

  lightrainandthunder: 'storm-cloudy',

  sleet: 'sleet',

  lightssleetshowersandthunder_day: 'storm-cloudy',
  lightssleetshowersandthunder_night: 'night-storm',
  lightssleetshowersandthunder_polartwilight: 'storm-cloudy',

  lightsleetandthunder: 'storm-cloudy',

  partlycloudy_day: 'sun-cloudy',
  partlycloudy_night: 'moon-cloudy',
  partlycloudy_polartwilight: 'sun-cloudy',

  sleetshowersandthunder_day: 'storm-cloudy',
  sleetshowersandthunder_night: 'night-storm',
  sleetshowersandthunder_polartwilight: 'storm-cloudy',

  rainshowers_day: 'shower',
  rainshowers_night: 'night-rain',
  rainshowers_polartwilight: 'shower',

  snowandthunder: 'storm-cloudy',

  sleetshowers_day: 'sleet',
  sleetshowers_night: 'sleet',
  sleetshowers_polartwilight: 'sleet',

  cloudy: 'cloudy-overcast',

  heavysnowshowersandthunder_day: 'storm-cloudy',
  heavysnowshowersandthunder_night: 'night-storm',
  heavysnowshowersandthunder_polartwilight: 'storm-cloudy',

  heavysnowshowers_day: 'snow',
  heavysnowshowers_night: 'night-snow',
  heavysnowshowers_polartwilight: 'snow',
};

export function getWeatherSymbol(val:MetNoWeatherSymbolValueObject): WeatherNameEntity{
  return weatherSymbolToWeatherNameMap[val]
}
