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
  WaningCrescent: 'Убывающий серп',
  WaningGibbous: 'Убывающая луна',
  WaxingCrescent: 'Растущий серп',
  WaxingGibbous: 'Растущая луна',
}

const localeMap: Record<string, LangPack> = {
  en: enLocal,
  ru: ruLocal,
}
export function getMoonPhaseTitle(value: MoonPhaseEntity): string {
  const usedLocale = localeMap[process.env.WX_LOCALE || 'en'] || localeMap.en
  return usedLocale[value]
}
