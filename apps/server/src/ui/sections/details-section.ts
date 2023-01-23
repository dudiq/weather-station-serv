import type { BlockResult } from '../types'
import { fieldBlock } from '../kit/field-block'
import { routerAsyncStorage } from '../../interface/service/router-async-storage'
import { render } from '../../interface/render'

const x = 500
const y = 48
const dx = 50

export function detailsSection(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const current = store.weather.current

  return render(
    fieldBlock({
      label: 'влажность:',
      value: `${current.hum.outdoor}%`,
      x,
      y: y,
    }),
    fieldBlock({
      label: 'влажность:',
      value: `${current.hum.outdoor}%`,
      x,
      y: y,
    }),
    fieldBlock({
      label: 'давление:',
      value: `${current.pressure.value}мм рт.`,
      x,
      y: y + dx,
    }),
    fieldBlock({
      label: 'UV:',
      value: `${current.uvindex} `, // todo add type
      x,
      y: y + dx * 2,
    }),
    fieldBlock({
      label: 'ветер:',
      value: `${Math.floor(current.wind.speed * 10) / 10} м/с`, // todo add direction
      x,
      y: y + dx * 3,
    })
  )
}
