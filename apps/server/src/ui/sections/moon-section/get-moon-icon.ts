// UTC Unix timestamp of the date of a previous New Moon
// Get a date/time here: https://www.timeanddate.com/moon/phases/
// And convert it to UTC Unix timestamp here: https://www.epochconverter.com/
const NEW_MOON = 1610514000
const MOON_ICONS = '0ABCDEFGHIJKLM@NOPQRSTUVWXYZ0'

export function getMoonIcon(): string {
  const now = Math.floor(Date.now() / 1000)
  const firstValue = (now - NEW_MOON) / (60 * 60 * 24)
  const lunarDay = firstValue % 29.530588853
  const moon = Math.round(28 * (lunarDay / 29.530588853))
  // The new moon is mapped to 0 and the full moon is mapped to @.  Other phases range from A-Z.

  return MOON_ICONS[moon]
}
