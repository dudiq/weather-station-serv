import fs from 'fs'
import * as path from 'path'

type Options = {
  ttl: number
}

export class CacheFile<T> {
  constructor(
    private readonly fileName: string,
    private readonly options: Options
  ) {
    // console.log('-cache started', {
    // fileName: this.fileName,
    // options: this.options
    // })
  }

  checkExpire(): boolean {
    const value = this.getValue()
    if (!value) return false
    const now = Date.now()
    const dx = now - value.saveDate
    return dx <= this.options.ttl
  }

  getValue(): { content: T; saveDate: number } | undefined {
    try {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const rawData = fs.readFileSync(path.resolve(this.fileName))
      // eslint-disable-next-line eslint-comments/no-restricted-disable
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const data = JSON.parse(rawData)
      return data
    } catch (e: unknown) {
      console.error('cache-file, getValue', e)
    }
  }

  setTtl(value: number){
    this.options.ttl = value
  }

  setValue(value: T): void {
    try {
      const data = JSON.stringify({
        content: value,
        saveDate: Date.now(),
      })
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.writeFileSync(path.resolve(this.fileName), data)
    } catch (e: unknown) {
      console.error('cache-file, getValue', e)
    }
  }
}
