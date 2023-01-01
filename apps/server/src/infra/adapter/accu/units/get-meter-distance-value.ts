// https://developer.accuweather.com/unit-types

export function getMeterDistanceValue(
  value: number,
  unitValue: number
): number {
  switch (unitValue) {
    case 4: // cm
      return value * 0.01
    case 5: // meters
      return value
    case 6: // kilometers
      return value * 1000
    default:
      return value
  }
}
