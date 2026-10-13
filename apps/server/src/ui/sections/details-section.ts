import { routerAsyncStorage } from '@lw/interface/service/router-async-storage'
import { render } from '@lw/interface/system/render'

import { fieldBlock } from '../kit/field-block'

import type { BlockResult } from '../types'
import {getLocale} from "@lw/interface/service/get-locale";

const x = 500
const y = 48
const dx = 50

type LangPack = Record<'pres_unit' | 'wind_unit', string>

const titles: Record<'ru' | 'en', LangPack> = {
  ru: {
    pres_unit: 'мм рт.',
    wind_unit: 'м/с'
  },
  en: {
    pres_unit: 'mm pt.',
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
      value: `${current.pressure.value}${usedTitles.pres_unit}`,
      x,
      y: y + dx,
    }),
    current.uvindex !== undefined ? fieldBlock({
      icon: 'uv',
      value: `${current.uvindex} `, // todo add type
      x,
      y: y + dx * 2,
    }) : undefined,
    fieldBlock({
      icon: 'wind',
      value: `${Math.floor(current.wind.speed * 10) / 10} ${usedTitles.wind_unit}`, // todo add direction
      x,
      y: y + dx * 3,
    })
  )
}
