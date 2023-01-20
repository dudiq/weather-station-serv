import type { BlockProps, BlockResult } from '../types'
import { fieldBlock } from '../kit/field-block'

const x = 500
const y = 48
const dx = 50

export function detailsSection({ current }: BlockProps): BlockResult {
  return [
    ...fieldBlock({
      label: 'влажность:',
      value: `${current.hum.outdoor}%`,
      x,
      y: y,
    }),
    ...fieldBlock({
      label: 'давление:',
      value: `${current.pressure.value}мм рт.`,
      x,
      y: y + dx,
    }),
    ...fieldBlock({
      label: 'UV:',
      value: `${current.uvindex} `, // todo add type
      x,
      y: y + dx * 2,
    }),
    ...fieldBlock({
      label: 'ветер:',
      value: `${Math.floor(current.wind.speed * 10) / 10} м/с`, // todo add direction
      x,
      y: y + dx * 3,
    }),
  ]
}
