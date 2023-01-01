import type { BlockProps, BlockResult } from '../../types'
import { getMeteoIcon } from '../../../service/get-meteo-icon'
import { formatDate } from '../../../service/format-date'

const x = 40
const y = 321
const dx = 300

const MAX_ITEMS = 3

export function forecastBlock({ forecast }: BlockProps): BlockResult {
  return [...forecast]
    .slice(0, MAX_ITEMS)
    .reduce<BlockResult>((acc, item, index) => {
      console.log('item.datetime', item.datetime)
      return [
        ...acc,
        {
          type: 'text',
          x: x + index * dx,
          y: y + 50,
          font: 'meteo-md',
          text: getMeteoIcon(item.day.weatherName),
          align: 'H_CENTER',
        },
        {
          type: 'text',
          x: x + index * dx,
          y,
          font: 't-md',
          text: formatDate(item.datetime, 'eee, dd'),
          align: 'H_CENTER',
        },
        {
          type: 'text',
          x: x + index * dx + 110,
          y: y + 30,
          font: 't-lg',
          align: 'LEFT',
          text: `${Math.floor(item.temp.max)}°`,
        },
        {
          type: 'text',
          x: x + index * dx + 110,
          y: y + 100,
          font: 't-lg',
          align: 'H_CENTER',
          text: `${Math.floor(item.temp.min)}°`,
        },
      ]
    }, [])
}
