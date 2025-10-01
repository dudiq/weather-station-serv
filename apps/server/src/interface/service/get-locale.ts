type TLocale = 'en' | 'ru'

const locale = (process.env.WX_LOCALE as TLocale | undefined) || 'en'

export function getLocale(): TLocale {
  return locale
}
