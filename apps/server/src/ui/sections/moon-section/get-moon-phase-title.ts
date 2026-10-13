import type { MoonPhaseEntity } from '@lw/core/value-objects/weather-forecast.value-object'

type LangPack = Record<MoonPhaseEntity, string>
const enLocal: LangPack = {
  New: 'New moon',
  First: 'First quarter',
  Full: 'Full moon',
  Last: 'Last quarter',
  WaningCrescent: 'Waning crescent',
  WaningGibbous: 'Waning gibbous',
  WaxingCrescent: 'Waxing crescent',
  WaxingGibbous: 'Waxing gibbous',
}

const ruLocal: LangPack = {
  New: 'Новолуние',
  First: 'Первая четверть',
  Full: 'Полнолуние',
  Last: 'Последняя четверть',
  WaningCrescent: 'Убывающая, 1/4',
  WaningGibbous: 'Убывающая, 3/4',
  WaxingCrescent: 'Растущая, 1/4',
  WaxingGibbous: 'Растущая, 3/4',
}

const localeMap: Record<string, LangPack> = {
  en: enLocal,
  ru: ruLocal,
}
export function getMoonPhaseTitle(value: MoonPhaseEntity): string {
  const usedLocale = localeMap[process.env.WX_LOCALE || 'en'] || localeMap.en
  return usedLocale[value]
}
