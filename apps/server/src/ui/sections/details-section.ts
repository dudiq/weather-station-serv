import { routerAsyncStorage } from '@lw/interface/service/router-async-storage'
import { render } from '@lw/interface/system/render'

import { fieldBlock } from '../kit/field-block'

import type { BlockResult } from '../types'
import {getLocale} from "@lw/interface/service/get-locale";

const x = 510
const y = 64
const columnGap = 220
const rowGap = 56

type LangPack = Record<'pres_unit' | 'wind_unit', string>

const titles: Record<'ru' | 'en', LangPack> = {
  ru: {
    pres_unit: 'мм рт.',
    wind_unit: 'м/с'
  },
  en: {
    pres_unit: 'mmHg',
    wind_unit: 'm/s'
  }
}

const usedTitles = titles[getLocale()]

export function detailsSection(): BlockResult {
  const store = routerAsyncStorage.getStore()
  if (!store) return []
  const current = store.weather.current

  return render(
    fieldBlock({
      icon: 'humidity',
      value: `${current.hum.outdoor}%`,
      x,
      y: y,
    }),
    fieldBlock({
      icon: 'pressure',
      value: `${current.pressure.value} ${usedTitles.pres_unit}`,
      x: x + columnGap,
      y,
    }),
    current.uvindex !== undefined ? fieldBlock({
      icon: 'uv',
      value: `${current.uvindex}`,
      x,
      y: y + rowGap * 2,
    }) : undefined,
    fieldBlock({
      icon: 'wind',
      value: `${Math.floor(current.wind.speed * 10) / 10} ${usedTitles.wind_unit}`, // todo add direction
      x,
      y: y + rowGap,
    }),
    current.cloudCover !== undefined ? fieldBlock({
      icon: 'cloud',
      value: `${current.cloudCover}%`,
      x: x + columnGap,
      y: y + rowGap,
    }) : undefined
  )
}
