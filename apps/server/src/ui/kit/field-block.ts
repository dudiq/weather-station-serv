import type { BlockResult } from '../types'

const icons = {
  humidity: '\uf07a',
  pressure: '\uf079',
  wind: '\uf050',
  cloud: '\uf041',
  uv: '\uf00d',
} as const

type Args = {
  icon: keyof typeof icons
  value: string
  x: number
  y: number
}

export function fieldBlock({ icon, value, x, y }: Args): BlockResult {
  return [
    // icon
    {
      type: 'text',
      x,
      y,
      font: 'field-icons',
      text: icons[icon],
      align: 'CENTER',
    },
    // value
    {
      type: 'text',
      x: x + 28,
      y: y + 12,
      font: 't-md',
      text: `${value}`,
      align: 'BASELINE',
    },
  ]
}
