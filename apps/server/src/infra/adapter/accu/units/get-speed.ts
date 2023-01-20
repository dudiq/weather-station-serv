export function getSpeed(
  value: number,
  unit: number,
  type: 'ms' | 'kmh'
): number {
  if (type === 'kmh') {
    switch (unit) {
      case 7: // km/h
        return value
      case 10: // m/s
        return value * 3.6
      default:
        return value
    }
  }

  switch (unit) {
    case 7: // km/h
      return value / 3.6
    case 10: // m/s
      return value
    default:
      return value
  }
}
