export function getMetersPerSecondToKmPerHour(
  value: number,
  unit: number
): number {
  switch (unit) {
    case 7:
      return value
    case 10:
      return value * 3.6
    default:
      return value
  }
}
