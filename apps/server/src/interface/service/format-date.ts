import { format as fnsFormat } from 'date-fns'
import * as locale from 'date-fns/locale'

import {getLocale} from "./get-locale";

export function formatDate(value: number | Date, mask: string): string {
  return fnsFormat(value, mask, {
    // eslint-disable-next-line eslint-comments/no-restricted-disable
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    locale: locale[getLocale()],
  })
}
