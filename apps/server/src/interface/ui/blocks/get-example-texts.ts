import type { DeviceTextNode } from '../../../core/device/device-text-node'

const defText = '-8°, 96%, 785.67 мм пятница'

export function getExampleTexts(): DeviceTextNode[] {
  const res: DeviceTextNode[] = [
    {
      type: 'text',
      x: 500,
      y: 20,
      font: 't-sm',
      align: 'LEFT',
      text: defText,
    },
    {
      type: 'text',
      x: 500,
      y: 50,
      font: 't-md',
      align: 'LEFT',
      text: defText,
    },
    {
      type: 'text',
      x: 500,
      y: 100,
      font: 't-lg',
      align: 'LEFT',
      text: defText,
    },
    {
      type: 'text',
      x: 500,
      y: 200,
      font: 't-xl',
      align: 'LEFT',
      text: defText,
    },
    {
      type: 'text',
      x: 500,
      y: 300,
      font: 'moon',
      align: 'LEFT',
      text: 'D',
    },
    {
      type: 'text',
      x: 700,
      y: 300,
      font: 'meteo-md',
      align: 'LEFT',
      text: 'D',
    },
    {
      type: 'text',
      x: 500,
      y: 350,
      font: 'meteo-xl',
      align: 'LEFT',
      text: 'A',
    },
  ]

  return res
}
