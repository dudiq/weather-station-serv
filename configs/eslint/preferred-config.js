import turboPlugin from 'eslint-plugin-turbo'

import simpleImportSort from 'eslint-plugin-simple-import-sort'
import baseImport from 'eslint-plugin-import'
import maxParams from 'eslint-plugin-max-params-no-constructor'

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const preferredConfig = [
  {
    plugins: {
      import: baseImport,
      turbo: turboPlugin,
      'simple-import-sort': simpleImportSort,
      'max-params-no-constructor': maxParams,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      'max-params': 'off',
      "max-params-no-constructor/max-params-no-constructor": ["error", 5],
      'simple-import-sort/exports': 'error',
      "import/no-extraneous-dependencies": 'off',
      // [
      //   "error", {
      //     "devDependencies": false,
      //     "optionalDependencies": false,
      //     "peerDependencies": false,
      //     packageDir: [__dirname, '../../', './'] // current pkg + root
      //   },
      // ],
      'import/no-default-export': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          // The default grouping, but with type imports last in each group.
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            // Packages. `react` related packages come first.
            ['^@?\\w'],
            // Internal packages.
            ['^(@app|~)?'],
            ['^(@wp|~)?'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.s?css$'],
            // Type imports.
            [
              '^@?\\u0000$',
              '^(@app|~)?\\u0000$',
              '^(@wp|~)?\\u0000$',
              '^[^.].*\\u0000$',
              '^\\..*\\u0000$',
            ],
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.stories.tsx', '**/*.config.{ts,js,mjs,cjs}'],
    rules: {
      'import/no-default-export': 'off'
    },
  },
  {
    ignores: ['dist/**', '.turbo', '.cache', '.idea', '.vscode'],
  }
]
