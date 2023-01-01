const HOUR_SECONDS = 60 * 60
const DEFAULT_WAKE_UP_SECONDS = HOUR_SECONDS * 2

const wakeupHoursByDay = [5, 11, 14, 17, 22]

function addLastHour(): void {
  const lastHour = wakeupHoursByDay[wakeupHoursByDay.length - 1]
  const nextHour = lastHour + wakeupHoursByDay[0] + (24 - lastHour)
  wakeupHoursByDay.push(nextHour)
}

addLastHour()

// wakeup 3 -> 5
// wakeup 4 -> 8 // Math.max
// wakeup 23 -> 5

export function getNextWakeupTimeout(): number {
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinutes = now.getMinutes()
  const nextHour =
    wakeupHoursByDay.find((hour) => currentHour < hour) || currentHour

  const dxHour =
    nextHour * HOUR_SECONDS - currentHour * HOUR_SECONDS + currentMinutes * 60

  const usedValue = Math.max(dxHour, DEFAULT_WAKE_UP_SECONDS)

  // get current date
  // switch by current date
  return usedValue
}
