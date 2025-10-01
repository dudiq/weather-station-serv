import { routerAsyncStorage } from '@lw/interface/service/router-async-storage'
import { render } from '@lw/interface/system/render'

import { fieldBlock } from '../../kit/field-block'

import { getMoonIcon } from './get-moon-icon'
import { getMoonPhaseTitle } from './get-moon-phase-title'

import type { BlockResult } from '../../types'

export function moonSection(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const { current, forecast } = store.weather

  return render(
    [
      forecast[0].moon ? {
        type: 'text',
        x: 795,
        y: 84,
        font: 't-md',
        align: 'LEFT',
        text: getMoonPhaseTitle(forecast[0].moon.phase),
      } : undefined,
      {
        type: 'text',
        x: 725,
        y: 84,
        font: 'moon',
        align: 'LEFT',
        text: getMoonIcon(),
      },
    ],
    fieldBlock({
      label: 'облачность',
      value: `${current.cloudCover}%`,
      x: 820,
      y: 155,
    })
  )
}
