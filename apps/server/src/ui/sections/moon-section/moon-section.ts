import type { DeviceItem } from '../../../core/device/device-result-request'
import type { BlockProps } from '../../types'
import { fieldBlock } from '../../kit/field-block'
import { getMoonIcon } from './get-moon-icon'
import { getMoonPhaseTitle } from './get-moon-phase-title'

export function moonSection({ current, forecast }: BlockProps): DeviceItem[] {
  return [
    {
      type: 'text',
      x: 795,
      y: 84,
      font: 't-md',
      align: 'LEFT',
      text: getMoonPhaseTitle(forecast[0].moon.phase),
    },
    {
      type: 'text',
      x: 725,
      y: 84,
      font: 'moon',
      align: 'LEFT',
      text: getMoonIcon(),
    },
    ...fieldBlock({
      label: 'облачность',
      value: `${current.cloudCover}%`,
      x: 820,
      y: 155,
    }),
  ]
}
