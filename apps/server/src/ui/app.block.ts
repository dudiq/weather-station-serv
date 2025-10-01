import { render } from '../interface/system/render'

import { currentSection } from './sections/current-section'
import { datetimeSection } from './sections/datetime-section'
import { detailsSection } from './sections/details-section'
import { forecastBlock } from './sections/forecast'
import { moonSection } from './sections/moon-section'

import type { BlockResult } from './types'

// 540 / 960
export function appBlock(): BlockResult {
  return render(
    datetimeSection(),
    currentSection(),
    detailsSection(),
    moonSection(),
    forecastBlock()
  )
}
