import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import onlyWarn from 'eslint-plugin-only-warn'

import vitest from 'eslint-plugin-vitest'
import security from 'eslint-plugin-security'
import { preferredConfig } from './preferred-config.js'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      onlyWarn,
      // filenames,
      // jsAlly,
      security,
      vitest,
    },
  },
  {
    ignores: ['dist/**', '.turbo', '.cache', '.idea', '.vscode'],
  },
  ...preferredConfig
]
