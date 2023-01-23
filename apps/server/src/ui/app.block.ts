import { render } from '../interface/render'
import { datetimeSection } from './sections/datetime-section'
import type { BlockResult } from './types'
import { currentSection } from './sections/current-section'
import { detailsSection } from './sections/details-section'
import { moonSection } from './sections/moon-section'
import { forecastBlock } from './sections/forecast'

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
