import { getMeteoIcon } from '@lw/interface/service/get-meteo-icon'
import { routerAsyncStorage } from '@lw/interface/service/router-async-storage'

import type { BlockResult } from '../types'

const START_Y = 49

export function currentSection(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const current = store.weather.current

  return [
    {
      type: 'text',
      x: 160,
      y: START_Y,
      font: 't-xl',
      align: 'H_CENTER',
      text: `${Math.floor(current.temp.current)}°`,
    },
    {
      type: 'text',
      x: 50,
      y: START_Y + 12,
      font: 'meteo-md',
      text: getMeteoIcon(current.weatherName),
      align: 'H_CENTER',
    },
    {
      type: 'text',
      x: 160,
      y: START_Y + 115,
      font: 't-lg',
      align: 'H_CENTER',
      text: current.temp.feelsLike
        ? `${Math.floor(current.temp.feelsLike)}°`
        : '',
    },
    {
      type: 'text',
      x: 50,
      y: START_Y + 171,
      font: 't-lg',
      align: 'LEFT',
      text: `${current.weatherDescription}`,
    },
  ]
}
