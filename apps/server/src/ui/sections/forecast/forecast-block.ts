import type { BlockResult } from '../../types'
import { getMeteoIcon } from '../../../interface/service/get-meteo-icon'
import { formatDate } from '../../../interface/service/format-date'
import { routerAsyncStorage } from '../../../interface/service/router-async-storage'

const START_X = 40
const START_Y = 321
const ITEM_GAP = 300

const MAX_ITEMS = 3

export function forecastBlock(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const { forecast } = store.weather

  return [...forecast]
    .slice(0, MAX_ITEMS)
    .reduce<BlockResult>((acc, item, index) => {
      console.log('item.datetime', item.datetime)
      return [
        ...acc,
        {
          type: 'text',
          x: START_X + index * ITEM_GAP,
          y: START_Y + 50,
          font: 'meteo-md',
          text: getMeteoIcon(item.day.weatherName),
          align: 'H_CENTER',
        },
        {
          type: 'text',
          x: START_X + index * ITEM_GAP,
          y: START_Y,
          font: 't-md',
          text: formatDate(item.datetime, 'eee, dd'),
          align: 'H_CENTER',
        },
        {
          type: 'text',
          x: START_X + index * ITEM_GAP + 110,
          y: START_Y + 35,
          font: 't-lg',
          align: 'LEFT',
          text: `${Math.floor(item.temp.max)}°`,
        },
        {
          type: 'text',
          x: START_X + index * ITEM_GAP + 110,
          y: START_Y + 100,
          font: 't-lg',
          align: 'H_CENTER',
          text: `${Math.floor(item.temp.min)}°`,
        },
      ]
    }, [])
}
