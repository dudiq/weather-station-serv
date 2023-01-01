import type { BlockProps, BlockResult } from '../types'
import { getMeteoIcon } from '../../service/get-meteo-icon'

export function currentSection({ current }: BlockProps): BlockResult {
  return [
    {
      type: 'text',
      x: 50,
      y: 51,
      font: 'meteo-md',
      text: getMeteoIcon(current.weatherName),
      align: 'H_CENTER',
    },
    {
      type: 'text',
      x: 50,
      y: 210,
      font: 't-lg',
      align: 'LEFT',
      text: `${current.weatherDescription}`,
    },
    {
      type: 'text',
      x: 160,
      y: 39,
      font: 't-xl',
      align: 'H_CENTER',
      text: `${Math.floor(current.temp.current)}°`,
    },
    {
      type: 'text',
      x: 160,
      y: 154,
      font: 't-lg',
      align: 'H_CENTER',
      text: current.temp.feelsLike
        ? `${Math.floor(current.temp.feelsLike)}°`
        : '',
    },
  ]
}
