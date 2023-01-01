const HOUR_SECONDS = 60 * 60

const wakeupHoursByDay = [5, 11, 14, 17, 22]

function getHoursList(): number[] {
  const lastHour = wakeupHoursByDay[wakeupHoursByDay.length - 1]
  const nextHour = lastHour + wakeupHoursByDay[0] + (24 - lastHour)
  const res = [...wakeupHoursByDay]
  res.push(nextHour)
  return res
}

const usedHoursList = getHoursList()

export function getSleepSeconds(currentDate: Date): number {
  const currentHour = currentDate.getHours()
  const currentMinutes = currentDate.getMinutes()
  const nextHour =
    usedHoursList.find((hour) => currentHour < hour) || currentHour

  const dxHour =
    nextHour * HOUR_SECONDS - (currentHour * HOUR_SECONDS + currentMinutes * 60)

  return dxHour
}
