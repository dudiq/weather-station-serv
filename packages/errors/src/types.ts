export type ErrorConstructable<T> = new (...args: any[]) => T

export type DomainError = {
  key: string
  message: string
  error?: unknown
  stack?: string
  chain: string[]
}

export type ErrorClasses<T> = {
  [P in keyof T]: ErrorConstructable<DomainError>
}

export type ErrorMessages<T> = {
  [P in keyof T]: T[P]
}

export type KeyOfErrors<T> = T[keyof T]
