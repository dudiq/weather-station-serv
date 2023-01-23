import { formatDate } from '../../interface/service/format-date'
import { routerAsyncStorage } from '../../interface/service/router-async-storage'
import type { BlockResult } from '../types'

export function datetimeSection(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const sleepSeconds = store.sleepSeconds
  const now = new Date()
  const nextWakeUp = new Date()
  nextWakeUp.setTime(nextWakeUp.getTime() + sleepSeconds * 1000)

  return [
    {
      type: 'text',
      x: 5,
      y: 5,
      font: 't-md',
      align: 'LEFT',
      text: formatDate(now, 'HH:mm | eee, dd MMM'),
    },
    {
      type: 'text',
      x: 360,
      y: 5,
      font: 't-sm',
      align: 'LEFT',
      text: `-> ${formatDate(nextWakeUp, 'HH:mm, dd MMM')}`,
    },
  ]
}
