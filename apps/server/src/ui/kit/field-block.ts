import type { BlockResult } from '../types'

type Args = {
  label: string
  value: string
  x: number
  y: number
}

export function fieldBlock({ label, value, x, y }: Args): BlockResult {
  return [
    // label
    {
      type: 'text',
      x,
      y,
      font: 't-sm',
      text: label,
      align: 'RIGHT',
    },
    // value
    {
      type: 'text',
      x: x + 10,
      y: y - 10,
      font: 't-md',
      text: `${value}`,
      align: 'LEFT',
    },
  ]
}
