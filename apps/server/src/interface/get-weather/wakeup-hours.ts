export const WAKEUP_HOURS: number[] = (() => {
  const defaultHours = [5, 11, 14, 17, 20, 23]

  const envHours = process.env.WX_WAKEUP_HOURS

  if (!envHours) return defaultHours

  try {
    const hoursFromEnv = JSON.parse(envHours) as number[]
    if (Array.isArray(hoursFromEnv)) return hoursFromEnv
    return defaultHours
  } catch (e: unknown) {
    return defaultHours
  }
})()
