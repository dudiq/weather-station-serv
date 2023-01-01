import type { WeatherNameEntity } from '../../core/entities/weather-name.entity'

const mapMeteoicon: Record<WeatherNameEntity, string> = {
  sunny: 'B',
  'sun-cloudy': 'H',
  cloudy: 'N',
  'cloudy-overcast': 'Y',
  fog: 'M',
  shower: 'Q',
  storm: 'P',
  'storm-cloudy': '0',
  rain: 'R',
  flurries: 'U',
  snow: 'V',
  temper: "'",
  sleet: 'W',
  windy: 'F',
  moon: '2',
  'moon-cloudy': '4',
  'night-shower': '7',
  'night-rain': '8',
  'night-storm': '6',
  'night-flurries': '"',
  'night-snow': '#',
  'not-available': ')',
  compass: '(',
}

export function getMeteoIcon(value: WeatherNameEntity): string {
  return mapMeteoicon[value]
}
