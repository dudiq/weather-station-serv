import { formatDate } from '../../interface/service/format-date'
import type { DeviceItem } from '../../core/device/device-result-request'

export function datetimeSection(): DeviceItem[] {
  return [
    {
      type: 'text',
      x: 5,
      y: 5,
      font: 't-md',
      align: 'LEFT',
      text: formatDate(new Date(), 'HH:mm | eee, dd MMM'),
    },
  ]
}
