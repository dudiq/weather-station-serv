import { routerAsyncStorage } from '@lw/interface/service/router-async-storage'
import { render } from '@lw/interface/system/render'

import { getMoonIcon, getMoonPhase } from './get-moon-icon'
import { getMoonPhaseTitle } from './get-moon-phase-title'

import type { BlockResult } from '../../types'

export function moonSection(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const { forecast } = store.weather
  const providerPhase = forecast[0]?.moon?.phase
  const now = Date.now()
  const phase = providerPhase ?? getMoonPhase(now)

  return render(
    [
      {
        type: 'text',
        x: 548,
        y: 198,
        font: 't-sm',
        opacity: 50,
        align: 'BASELINE',
        text: getMoonPhaseTitle(phase),
      },
      {
        type: 'text',
        x: 510,
        y: 192,
        font: 'moon',
        align: 'CENTER',
        text: getMoonIcon(providerPhase, now),
      },
    ]
  )
}
