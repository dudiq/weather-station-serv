import type { ErrorClasses, ErrorMessages } from './types'
import { createErrorClass } from './create-error-class'

export class ErrorBlock<T> {
  errors: ErrorClasses<T>

  constructor(namespace: string, readonly errorRecord: ErrorMessages<T>) {
    const keys = Object.keys(errorRecord) as Array<keyof T>

    // eslint-disable-next-line eslint-comments/no-restricted-disable
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.errors = keys.reduce<T>((acc, key) => {
      const message = errorRecord[key]
      const fullKey = `${namespace}.${String(key)}`
      // eslint-disable-next-line eslint-comments/no-restricted-disable
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      acc[key] = createErrorClass(fullKey, message)
      return acc
      // eslint-disable-next-line eslint-comments/no-restricted-disable
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    }, {} as ErrorClasses<T>)
  }
}
