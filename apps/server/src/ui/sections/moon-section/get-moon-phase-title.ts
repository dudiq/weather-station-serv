import type { MoonPhaseEntity } from '../../../core/value-objects/weather-forecast.value-object'

type LangPack = Record<MoonPhaseEntity, string>
const enLocal: LangPack = {
  NewMoon: 'New',
  FirstQuarter: 'First Q',
  FullMoon: 'Full',
  LastQuarter: 'Last Q',
  WaningCrescent: 'Waning C',
  WaningGibbous: 'Waninng G',
  WaxingCrescent: 'Wax C',
  WaxingGibbous: 'Wax G',
}

const ruLocal: LangPack = {
  NewMoon: 'Новая',
  FirstQuarter: 'Первая',
  FullMoon: 'Полная',
  LastQuarter: 'Посленяя',
  WaningCrescent: '1/4 У',
  WaningGibbous: '3/4 У',
  WaxingCrescent: '1/4 Во',
  WaxingGibbous: '3/4 Во',
}

const localeMap: Record<string, LangPack> = {
  en: enLocal,
  ru: ruLocal,
}
export function getMoonPhaseTitle(value: MoonPhaseEntity): string {
  const usedLocale = localeMap[process.env.WX_LOCALE] || localeMap.en
  return usedLocale[value]
}
