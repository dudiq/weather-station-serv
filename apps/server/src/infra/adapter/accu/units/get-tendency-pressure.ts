import type { PressureTendencyValueObject } from '../../../../core/value-objects/pressure-tendency.value-object'

const map: Record<string, PressureTendencyValueObject> = {
  F: 'falling',
  S: 'steady',
  R: 'rising',
}

export function getTendencyPressure(
  value: string
): PressureTendencyValueObject {
  return map[value]
}
