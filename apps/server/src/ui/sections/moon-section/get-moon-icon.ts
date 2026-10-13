import type { MoonPhaseEntity } from '@lw/core/value-objects/weather-forecast.value-object'

// UTC Unix timestamp of the date of a previous New Moon
// Get a date/time here: https://www.timeanddate.com/moon/phases/
// And convert it to UTC Unix timestamp here: https://www.epochconverter.com/
const NEW_MOON = 1610514000
const MOON_ICONS = '0ABCDEFGHIJKLM@NOPQRSTUVWXYZ0'
const PHASE_ICON_INDEX: Record<MoonPhaseEntity, number> = {
  New: 0, WaxingCrescent: 4, First: 7, WaxingGibbous: 11,
  Full: 14, WaningGibbous: 18, Last: 21, WaningCrescent: 25,
}

function cyclePosition(timestamp = Date.now()): number {
  const days = (timestamp / 1000 - NEW_MOON) / (60 * 60 * 24)
  return ((days % 29.530588853) + 29.530588853) % 29.530588853 / 29.530588853
}

function iconIndex(timestamp: number): number {
  return Math.round(cyclePosition(timestamp) * 28) % 28
}

// Use the same 28-step cycle for the caption and glyph. Major phases occupy
// one step (about one day), not a rounded eighth of a month (~3.7 days).
// This remains a mean-cycle approximation, not an ephemeris calculation.
export function getMoonPhase(timestamp = Date.now()): MoonPhaseEntity {
  const index = iconIndex(timestamp)
  if (index === 0) return 'New'
  if (index < 7) return 'WaxingCrescent'
  if (index === 7) return 'First'
  if (index < 14) return 'WaxingGibbous'
  if (index === 14) return 'Full'
  if (index < 21) return 'WaningGibbous'
  if (index === 21) return 'Last'
  return 'WaningCrescent'
}

export function getMoonIcon(phase?: MoonPhaseEntity, timestamp = Date.now()): string {
  const moon = phase ? PHASE_ICON_INDEX[phase] : iconIndex(timestamp)
  // The new moon is mapped to 0 and the full moon is mapped to @.  Other phases range from A-Z.

  return MOON_ICONS[moon]
}
