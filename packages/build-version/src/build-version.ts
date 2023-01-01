// eslint-disable-next-line eslint-comments/no-restricted-disable
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const time = (process.env._TIME_ENTRY_ as number) || Date.now()

export const buildVersion = {
  time,
  date: new Date(time),
  tz: process.env.TZ,
}
