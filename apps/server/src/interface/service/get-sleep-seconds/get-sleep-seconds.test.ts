import { getSleepSeconds } from './get-sleep-seconds'

const wakeupHoursByDay = [5, 11, 14, 17, 22]

describe('get-sleep-seconds', () => {
  it('should return next day morning', () => {
    const sleepSeconds = getSleepSeconds(
      new Date(2032, 0, 1, 22, 0),
      wakeupHoursByDay
    )

    expect(sleepSeconds).toBe(7 * 60 * 60)
  })

  it('should return next day morning before midnight', () => {
    const sleepSeconds = getSleepSeconds(
      new Date(2032, 0, 1, 23, 0),
      wakeupHoursByDay
    )

    expect(sleepSeconds).toBe(6 * 60 * 60)
  })

  it('should return next 30 mins between', () => {
    const sleepSeconds = getSleepSeconds(
      new Date(2032, 0, 1, 10, 30),
      wakeupHoursByDay
    )

    expect(sleepSeconds).toBe(60 * 30)
  })
})
