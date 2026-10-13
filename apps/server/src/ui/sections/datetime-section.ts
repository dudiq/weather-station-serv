import { formatDate } from '@lw/interface/service/format-date'
import { routerAsyncStorage } from '@lw/interface/service/router-async-storage'

import type { BlockResult } from '../types'

export function datetimeSection(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const sleepSeconds = store.sleepSeconds
  const now = new Date()
  const nextWakeUp = new Date(now.getTime() + sleepSeconds * 1000)

  return [
    {
      type: 'text',
      x: 12,
      y: 528,
      font: 't-sm',
      opacity: 50,
      align: 'BASELINE',
      text: `${formatDate(now, 'HH:mm')} |`,
    },
    {
      type: 'text',
      x: 100,
      y: 528,
      font: 't-sm',
      opacity: 50,
      align: 'BASELINE',
      text: `${formatDate(now, 'eee, dd MMM')} |`,
    },
    {
      type: 'text',
      x: 300,
      y: 528,
      font: 't-sm',
      opacity: 50,
      align: 'BASELINE',
      text: `-> ${formatDate(nextWakeUp, 'HH:mm, dd MMM')} |`,
    },
  ]
}
