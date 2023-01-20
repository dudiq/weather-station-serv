import type { PromiseResult } from '@local-weather/result'
import { resultOk } from '@local-weather/result'
import type { DeviceItem } from '../core/device/device-result-request'
import { datetimeSection } from './sections/datetime-section'
import type { BlockProps, BlockResult } from './types'
import { currentSection } from './sections/current-section'
import { detailsSection } from './sections/details-section'
import { moonSection } from './sections/moon-section/moon-section'
import { forecastBlock } from './sections/forecast'

// 540 / 960
export async function renderBlock({
  current,
  forecast,
}: BlockProps): PromiseResult<BlockResult> {
  // console.log('current', current)

  const res = resultOk<DeviceItem[]>([
    ...datetimeSection(),
    ...currentSection({
      current,
      forecast,
    }),
    ...detailsSection({
      current,
      forecast,
    }),
    ...moonSection({
      current,
      forecast,
    }),
    ...forecastBlock({
      current,
      forecast,
    }),
  ])

  return res
}
