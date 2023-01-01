import type { ErrorConstructable, DomainError } from './types'

function formatRow(acc: string[], item: DomainError, separator?: string) {
  return acc.concat(item.chain.map((node) => `${separator || ''}${node}`))
}

function getChain(context: DomainError): string[] {
  const field = `${context.key}; ${context.message}`
  const chain = [field]
  const error = context.error as DomainError
  if (Array.isArray(error)) {
    const chainList = error.reduce((acc, item: DomainError) => {
      if (item && item.chain) {
        return formatRow(acc, item, '-')
      }
      return acc
    }, [])
    return chain.concat(chainList)
  }
  if (error && error.chain) {
    return formatRow(chain, error)
  }
  return chain
}

export function createErrorClass(
  key: string,
  message: string
): ErrorConstructable<DomainError> {
  return class ErrorClass implements DomainError {
    key: string
    message: string
    error?: ErrorClass | unknown
    stack?: string
    chain: string[]

    constructor(error?: any | ErrorClass) {
      this.stack = new Error().stack
      this.error = error
      this.message = error?.message ? `${message}; ${error.message}` : message
      this.key = key
      this.chain = getChain(this)
    }
  }
}
