import type {DeviceItem} from "@lw/core/device/device-result-request";
import type { BlockResult } from '@lw/ui/types'

type RenderItem = (DeviceItem | undefined)[]

type Props = RenderItem | (RenderItem | undefined)[]

export function render(...args: Props): BlockResult {
  const list = args.filter((item) => !!item)

  return list.reduce<BlockResult>((acc, item) => {
    if (!item) return acc
    if (Array.isArray(item)) {
      const list = render(...item)
      return [...acc, ...list]
    }
    return [...acc, item]
  }, [])
}
