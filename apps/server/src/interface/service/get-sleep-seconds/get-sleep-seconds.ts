const HOUR_SECONDS = 60 * 60

const MIN_SECONDS = 20 * 60

function getHoursList(wakeupHoursByDay: number[]): number[] {
  const lastHour = wakeupHoursByDay[wakeupHoursByDay.length - 1]
  const nextHour = lastHour + wakeupHoursByDay[0] + (24 - lastHour)
  const res = [...wakeupHoursByDay]
  res.push(nextHour)
  return res
}

function getDxSeconds(checkDate: Date, usedHoursList: number[]): number {
  const currentDate = new Date(checkDate)
  const currentHour = currentDate.getHours()
  const currentMinutes = currentDate.getMinutes()
  const nextHour =
    usedHoursList.find((hour) => currentHour < hour) || currentHour

  return (
    nextHour * HOUR_SECONDS - (currentHour * HOUR_SECONDS + currentMinutes * 60)
  )
}

export function getSleepSeconds(
  currentDate: Date,
  wakeupHoursByDay: number[]
): number {
  const usedHoursList = getHoursList(wakeupHoursByDay)

  const dxHourInSeconds = getDxSeconds(currentDate, usedHoursList)

  if (dxHourInSeconds >= MIN_SECONDS) {
    return dxHourInSeconds
  }

  const nextDate = new Date(currentDate)
  nextDate.setTime(nextDate.getTime() + HOUR_SECONDS * 1000)
  const nextDx = getDxSeconds(nextDate, usedHoursList)

  return nextDx
}
