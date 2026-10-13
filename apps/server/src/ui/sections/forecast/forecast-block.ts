import { formatDate } from '@lw/interface/service/format-date'
import { getMeteoIcon } from '@lw/interface/service/get-meteo-icon'
import { routerAsyncStorage } from '@lw/interface/service/router-async-storage'

import type { BlockResult } from '@lw/ui/types'

const START_X = 24
const START_Y = 312
const BLOCK_WIDTH = 304
const BLOCK_HEIGHT = 184
const MAX_DAYS = 3

export function forecastBlock(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const days = store.weather.forecast.slice(0, MAX_DAYS)
  const blocks: BlockResult = []

  if (days.length > 0) {
    blocks.push({
      type: 'rect',
      x: START_X,
      y: START_Y - 8,
      width: BLOCK_WIDTH * MAX_DAYS,
      height: 1,
      opacity: 50,
    })
  }

  days.forEach((item, index) => {
    const left = START_X + index * BLOCK_WIDTH
    blocks.push(
      {
        type: 'text',
        x: left + BLOCK_WIDTH / 2,
        y: START_Y + 26,
        font: 't-md',
        text: formatDate(item.datetime, 'eee, dd'),
        align: 'CENTER',
      },
      {
        type: 'text',
        x: left + 80,
        y: START_Y + 108,
        font: 'meteo-sm',
        text: getMeteoIcon(item.day.weatherName),
        align: 'CENTER',
      },
      {
        type: 'text',
        x: left + 214,
        y: START_Y + 88,
        font: 't-lg',
        text: `${Math.floor(item.temp.max)}°`,
        align: 'CENTER',
      },
      {
        type: 'text',
        x: left + 214,
        y: START_Y + 152,
        font: 't-lg',
        text: `${Math.floor(item.temp.min)}°`,
        align: 'CENTER',
      }
    )
    if (index < days.length - 1) {
      const height = Math.round(BLOCK_HEIGHT * 0.6)
      blocks.push({
        type: 'rect',
        x: left + BLOCK_WIDTH,
        y: START_Y + Math.round((BLOCK_HEIGHT - height) / 2),
        width: 1,
        height,
        opacity: 50,
      })
    }
  })

  return blocks
}
