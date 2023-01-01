import type { DeviceItem } from '../../../core/device/device-result-request'
import type { BlockProps } from '../types'
import { fieldBlock } from '../kit/field-block'

// UTC Unix timestamp of the date of a previous New Moon
// Get a date/time here: https://www.timeanddate.com/moon/phases/
// And convert it to UTC Unix timestamp here: https://www.epochconverter.com/
const NEW_MOON = 1610514000
const MOON_ICONS = '0ABCDEFGHIJKLM@NOPQRSTUVWXYZ0'

function moonToChar(): string {
  const now = Math.floor(Date.now() / 1000)
  const firstValue = (now - NEW_MOON) / (60 * 60 * 24)
  const lunarDay = firstValue % 29.530588853
  const moon = Math.round(28 * (lunarDay / 29.530588853))
  // The new moon is mapped to 0 and the full moon is mapped to @.  Other phases range from A-Z.

  return MOON_ICONS[moon]
}

export function moonSection({ current, forecast }: BlockProps): DeviceItem[] {
  return [
    {
      type: 'text',
      x: 795,
      y: 84,
      font: 't-md',
      align: 'LEFT',
      text: forecast[0].moon.phase,
    },
    {
      type: 'text',
      x: 725,
      y: 84,
      font: 'moon',
      align: 'LEFT',
      text: moonToChar(),
    },
    ...fieldBlock({
      label: 'облачность',
      value: `${current.cloudCover}%`,
      x: 810,
      y: 145,
    }),
  ]
}
