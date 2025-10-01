import {getLocale} from "../service/get-locale";

import type {DeviceResultRequest} from "@lw/core/device/device-result-request";

const DEV_SLEEP = 1000 * 60 * 10 // 10 minutes

export function failedWeatherResult(): DeviceResultRequest {
  const locale = getLocale()
  const title = locale === 'en' ? 'Weather get failed, check your provider' : 'Ошибка получения погоды, проверьте провайдера'
  return {
    sleepSeconds: 1000 * 60 * 10, // 10 minutes
    blocks: {
      total: 0,
      items: [{
        type: 'text',
        x: 5,
        y: 5,
        font: 't-md',
        align: 'LEFT',
        text: title,
      }],
    },
    devSleep: DEV_SLEEP,
  }
}
