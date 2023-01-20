const HOUR_SECONDS = 60 * 60

function getHoursList(wakeupHoursByDay: number[]): number[] {
  const lastHour = wakeupHoursByDay[wakeupHoursByDay.length - 1]
  const nextHour = lastHour + wakeupHoursByDay[0] + (24 - lastHour)
  const res = [...wakeupHoursByDay]
  res.push(nextHour)
  return res
}

export function getSleepSeconds(
  currentDate: Date,
  wakeupHoursByDay: number[]
): number {
  const usedHoursList = getHoursList(wakeupHoursByDay)

  const currentHour = currentDate.getHours()
  const currentMinutes = currentDate.getMinutes()
  const nextHour =
    usedHoursList.find((hour) => currentHour < hour) || currentHour

  const dxHour =
    nextHour * HOUR_SECONDS - (currentHour * HOUR_SECONDS + currentMinutes * 60)

  return dxHour
}
