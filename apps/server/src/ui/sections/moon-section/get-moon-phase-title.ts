import type { MoonPhaseEntity } from '../../../core/value-objects/weather-forecast.value-object'

type LangPack = Record<MoonPhaseEntity, string>
const enLocal: LangPack = {
  New: 'New',
  First: 'First Q',
  Full: 'Full',
  Last: 'Last Q',
  WaningCrescent: 'Waning C',
  WaningGibbous: 'Waninng G',
  WaxingCrescent: 'Wax C',
  WaxingGibbous: 'Wax G',
}

const ruLocal: LangPack = {
  New: 'Новая',
  First: 'Первая',
  Full: 'Полная',
  Last: 'Посленяя',
  WaningCrescent: '1/4 уб',
  WaningGibbous: '3/4 уб',
  WaxingCrescent: '1/4 во',
  WaxingGibbous: '3/4 во',
}

const localeMap: Record<string, LangPack> = {
  en: enLocal,
  ru: ruLocal,
}
export function getMoonPhaseTitle(value: MoonPhaseEntity): string {
  const usedLocale = localeMap[process.env.WX_LOCALE || 'en'] || localeMap.en
  return usedLocale[value]
}
