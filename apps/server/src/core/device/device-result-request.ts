import type { DeviceTextNode } from './device-text-node'
import type { DeviceImageNode } from './device-image-node'

export type DeviceItem = DeviceTextNode | DeviceImageNode

export type DeviceResultRequest = {
  sleepSeconds: number
  blocks: {
    total: number
    items: DeviceItem[]
  }
  isDev?: boolean
  devSleep?: number
}
