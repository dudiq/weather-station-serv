import type { BlockResult } from '../ui/types'

type Props = BlockResult | BlockResult[]

export function render(...args: Props): BlockResult {
  const list = args.map((item) => item)
  return list.reduce<BlockResult>((acc, item) => {
    if (Array.isArray(item)) {
      const list = render(...item)
      return [...acc, ...list]
    }
    return [...acc, item]
  }, [])
}
