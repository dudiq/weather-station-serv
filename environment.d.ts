declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      WX_PLACE: string
      WX_TOKEN_KEY: string
      WX_LOCALE: string
      WX_PORT: string
      WX_HOST: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
