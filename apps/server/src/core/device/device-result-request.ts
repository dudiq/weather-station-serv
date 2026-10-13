import type { DeviceImageNode } from './device-image-node'
import type { DeviceTextNode } from './device-text-node'
import type { DeviceRectNode } from './device-rect-node'

export type DeviceItem = DeviceTextNode | DeviceImageNode | DeviceRectNode

export type DeviceResultRequest = {
  sleepSeconds: number
  blocks: {
    total: number
    items: DeviceItem[]
  }
  isDev?: boolean
  devSleep?: number
}
