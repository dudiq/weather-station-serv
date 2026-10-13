import { getMeteoIcon } from '@lw/interface/service/get-meteo-icon'
import { getLocale } from '@lw/interface/service/get-locale'
import { routerAsyncStorage } from '@lw/interface/service/router-async-storage'

import type { BlockResult } from '../types'

export function currentSection(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const current = store.weather.current

  const blocks: BlockResult = [
    {
      type: 'text',
      x: 300,
      y: 104,
      font: 't-xl',
      align: 'CENTER',
      text: `${Math.floor(current.temp.current)}°`,
    },
    {
      type: 'text',
      x: 92,
      y: 104,
      font: 'meteo-md',
      text: getMeteoIcon(current.weatherName),
      align: 'CENTER',
    },
    {
      type: 'text',
      x: 24,
      y: 244,
      font: 't-md',
      align: 'BASELINE',
      width: 424,
      maxLines: 2,
      text: `${current.weatherDescription}`,
    },
  ]
  if (current.temp.feelsLike !== undefined) {
    blocks.push(
      {
        type: 'text', x: 180, y: 188, font: 't-sm',
        align: 'BASELINE', opacity: 50,
        text: getLocale() === 'ru' ? 'Ощущается как' : 'Feels like',
      },
      {
        type: 'text', x: 340, y: 188, font: 't-md',
        align: 'BASELINE', text: `${Math.floor(current.temp.feelsLike)}°`,
      }
    )
  }
  return blocks
}
