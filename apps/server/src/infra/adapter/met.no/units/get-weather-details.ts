import {MetNoWeatherSymbolValueObject} from "@lw/infra/adapter/met.no/types/met-no-weather-symbol-value-object";
import {getLocale} from "@lw/interface/service/get-locale";

const ruTitles: Record<MetNoWeatherSymbolValueObject, string> = {
  clearsky_day: "Ясно",
  clearsky_night: "Ясно",
  clearsky_polartwilight: "Ясно",

  fair_day: "Малооблачно",
  fair_night: "Малооблачно",
  fair_polartwilight: "Малооблачно",

  lightssnowshowersandthunder_day: "Слабые снегопады и гроза",
  lightssnowshowersandthunder_night: "Слабые снегопады и гроза",
  lightssnowshowersandthunder_polartwilight: "Слабые снегопады и гроза",

  lightsnowshowers_day: "Слабый снегопад",
  lightsnowshowers_night: "Слабый снегопад",
  lightsnowshowers_polartwilight: "Слабый снегопад",

  heavyrainandthunder: "Сильный дождь и гроза",
  heavysnowandthunder: "Сильный снег и гроза",
  rainandthunder: "Дождь и гроза",

  heavysleetshowersandthunder_day: "Сильный мокрый снег и гроза",
  heavysleetshowersandthunder_night: "Сильный мокрый снег и гроза",
  heavysleetshowersandthunder_polartwilight: "Сильный мокрый снег и гроза",

  heavysnow: "Сильный снег",

  heavyrainshowers_day: "Сильный ливень",
  heavyrainshowers_night: "Сильный ливень",
  heavyrainshowers_polartwilight: "Сильный ливень",

  lightsleet: "Слабый мокрый снег",

  heavyrain: "Сильный дождь",

  lightrainshowers_day: "Небольшой дождь",
  lightrainshowers_night: "Небольшой дождь",
  lightrainshowers_polartwilight: "Небольшой дождь",

  heavysleetshowers_day: "Сильный мокрый снег",
  heavysleetshowers_night: "Сильный мокрый снег",
  heavysleetshowers_polartwilight: "Сильный мокрый снег",

  lightsleetshowers_day: "Слабый мокрый снег",
  lightsleetshowers_night: "Слабый мокрый снег",
  lightsleetshowers_polartwilight: "Слабый мокрый снег",

  snow: "Снег",

  heavyrainshowersandthunder_day: "Сильный ливень и гроза",
  heavyrainshowersandthunder_night: "Сильный ливень и гроза",
  heavyrainshowersandthunder_polartwilight: "Сильный ливень и гроза",

  snowshowers_day: "Снегопад",
  snowshowers_night: "Снегопад",
  snowshowers_polartwilight: "Снегопад",

  fog: "Туман",

  snowshowersandthunder_day: "Снегопад и гроза",
  snowshowersandthunder_night: "Снегопад и гроза",
  snowshowersandthunder_polartwilight: "Снегопад и гроза",

  lightsnowandthunder: "Слабый снег и гроза",
  heavysleetandthunder: "Сильный мокрый снег и гроза",

  lightrain: "Небольшой дождь",

  rainshowersandthunder_day: "Дождь и гроза",
  rainshowersandthunder_night: "Дождь и гроза",
  rainshowersandthunder_polartwilight: "Дождь и гроза",

  rain: "Дождь",

  lightsnow: "Небольшой снег",

  lightrainshowersandthunder_day: "Небольшой дождь и гроза",
  lightrainshowersandthunder_night: "Небольшой дождь и гроза",
  lightrainshowersandthunder_polartwilight: "Небольшой дождь и гроза",

  heavysleet: "Сильный мокрый снег",

  sleetandthunder: "Мокрый снег и гроза",

  lightrainandthunder: "Небольшой дождь и гроза",

  sleet: "Мокрый снег",

  lightssleetshowersandthunder_day: "Слабый мокрый снег и гроза",
  lightssleetshowersandthunder_night: "Слабый мокрый снег и гроза",
  lightssleetshowersandthunder_polartwilight: "Слабый мокрый снег и гроза",

  lightsleetandthunder: "Слабый мокрый снег и гроза",

  partlycloudy_day: "Переменная облачность",
  partlycloudy_night: "Переменная облачность",
  partlycloudy_polartwilight: "Переменная облачность",

  sleetshowersandthunder_day: "Мокрый снег и гроза",
  sleetshowersandthunder_night: "Мокрый снег и гроза",
  sleetshowersandthunder_polartwilight: "Мокрый снег и гроза",

  rainshowers_day: "Дождь",
  rainshowers_night: "Дождь",
  rainshowers_polartwilight: "Дождь",

  snowandthunder: "Снег и гроза",

  sleetshowers_day: "Мокрый снег",
  sleetshowers_night: "Мокрый снег",
  sleetshowers_polartwilight: "Мокрый снег",

  cloudy: "Пасмурно",

  heavysnowshowersandthunder_day: "Сильный снегопад и гроза",
  heavysnowshowersandthunder_night: "Сильный снегопад и гроза",
  heavysnowshowersandthunder_polartwilight: "Сильный снегопад и гроза",

  heavysnowshowers_day: "Сильный снегопад",
  heavysnowshowers_night: "Сильный снегопад",
  heavysnowshowers_polartwilight: "Сильный снегопад",
};

const enTitles: Record<MetNoWeatherSymbolValueObject, string> = {
  clearsky_day: "Clear sky",
  clearsky_night: "Clear sky",
  clearsky_polartwilight: "Clear sky",

  fair_day: "Fair",
  fair_night: "Fair",
  fair_polartwilight: "Fair",

  lightssnowshowersandthunder_day: "Light snow showers and thunder",
  lightssnowshowersandthunder_night: "Light snow showers and thunder",
  lightssnowshowersandthunder_polartwilight: "Light snow showers and thunder",

  lightsnowshowers_day: "Light snow showers",
  lightsnowshowers_night: "Light snow showers",
  lightsnowshowers_polartwilight: "Light snow showers",

  heavyrainandthunder: "Heavy rain and thunder",
  heavysnowandthunder: "Heavy snow and thunder",
  rainandthunder: "Rain and thunder",

  heavysleetshowersandthunder_day: "Heavy sleet showers and thunder",
  heavysleetshowersandthunder_night: "Heavy sleet showers and thunder",
  heavysleetshowersandthunder_polartwilight: "Heavy sleet showers and thunder",

  heavysnow: "Heavy snow",

  heavyrainshowers_day: "Heavy rain showers",
  heavyrainshowers_night: "Heavy rain showers",
  heavyrainshowers_polartwilight: "Heavy rain showers",

  lightsleet: "Light sleet",

  heavyrain: "Heavy rain",

  lightrainshowers_day: "Light rain showers",
  lightrainshowers_night: "Light rain showers",
  lightrainshowers_polartwilight: "Light rain showers",

  heavysleetshowers_day: "Heavy sleet showers",
  heavysleetshowers_night: "Heavy sleet showers",
  heavysleetshowers_polartwilight: "Heavy sleet showers",

  lightsleetshowers_day: "Light sleet showers",
  lightsleetshowers_night: "Light sleet showers",
  lightsleetshowers_polartwilight: "Light sleet showers",

  snow: "Snow",

  heavyrainshowersandthunder_day: "Heavy rain showers and thunder",
  heavyrainshowersandthunder_night: "Heavy rain showers and thunder",
  heavyrainshowersandthunder_polartwilight: "Heavy rain showers and thunder",

  snowshowers_day: "Snow showers",
  snowshowers_night: "Snow showers",
  snowshowers_polartwilight: "Snow showers",

  fog: "Fog",

  snowshowersandthunder_day: "Snow showers and thunder",
  snowshowersandthunder_night: "Snow showers and thunder",
  snowshowersandthunder_polartwilight: "Snow showers and thunder",

  lightsnowandthunder: "Light snow and thunder",
  heavysleetandthunder: "Heavy sleet and thunder",

  lightrain: "Light rain",

  rainshowersandthunder_day: "Rain showers and thunder",
  rainshowersandthunder_night: "Rain showers and thunder",
  rainshowersandthunder_polartwilight: "Rain showers and thunder",

  rain: "Rain",

  lightsnow: "Light snow",

  lightrainshowersandthunder_day: "Light rain showers and thunder",
  lightrainshowersandthunder_night: "Light rain showers and thunder",
  lightrainshowersandthunder_polartwilight: "Light rain showers and thunder",

  heavysleet: "Heavy sleet",

  sleetandthunder: "Sleet and thunder",

  lightrainandthunder: "Light rain and thunder",

  sleet: "Sleet",

  lightssleetshowersandthunder_day: "Light sleet showers and thunder",
  lightssleetshowersandthunder_night: "Light sleet showers and thunder",
  lightssleetshowersandthunder_polartwilight: "Light sleet showers and thunder",

  lightsleetandthunder: "Light sleet and thunder",

  partlycloudy_day: "Partly cloudy",
  partlycloudy_night: "Partly cloudy",
  partlycloudy_polartwilight: "Partly cloudy",

  sleetshowersandthunder_day: "Sleet showers and thunder",
  sleetshowersandthunder_night: "Sleet showers and thunder",
  sleetshowersandthunder_polartwilight: "Sleet showers and thunder",

  rainshowers_day: "Rain showers",
  rainshowers_night: "Rain showers",
  rainshowers_polartwilight: "Rain showers",

  snowandthunder: "Snow and thunder",

  sleetshowers_day: "Sleet showers",
  sleetshowers_night: "Sleet showers",
  sleetshowers_polartwilight: "Sleet showers",

  cloudy: "Overcast",

  heavysnowshowersandthunder_day: "Heavy snow showers and thunder",
  heavysnowshowersandthunder_night: "Heavy snow showers and thunder",
  heavysnowshowersandthunder_polartwilight: "Heavy snow showers and thunder",

  heavysnowshowers_day: "Heavy snow showers",
  heavysnowshowers_night: "Heavy snow showers",
  heavysnowshowers_polartwilight: "Heavy snow showers",
};

const locale = getLocale();

export function getWeatherDetails(value: MetNoWeatherSymbolValueObject): string{
  if (locale === 'ru') {
    return ruTitles[value]
  }

  return enTitles[value]
}
