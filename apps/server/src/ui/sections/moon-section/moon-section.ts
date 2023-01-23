import type { BlockResult } from '../../types'
import { fieldBlock } from '../../kit/field-block'
import { routerAsyncStorage } from '../../../interface/service/router-async-storage'
import { render } from '../../../interface/render'
import { getMoonIcon } from './get-moon-icon'
import { getMoonPhaseTitle } from './get-moon-phase-title'

export function moonSection(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const { current, forecast } = store.weather

  return render(
    [
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
    ],
    fieldBlock({
      label: 'облачность',
      value: `${current.cloudCover}%`,
      x: 820,
      y: 155,
    })
  )
}
