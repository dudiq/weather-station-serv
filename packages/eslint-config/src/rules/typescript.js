module.exports = {
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/consistent-type-assertions': 'warn',
  '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
  '@typescript-eslint/no-array-constructor': 'warn',
  '@typescript-eslint/no-use-before-define': [
    'warn',
    {
      functions: false,
      classes: false,
      variables: false,
      typedefs: false,
    },
  ],
  '@typescript-eslint/no-unused-expressions': [
    'error',
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
    },
  ],
  '@typescript-eslint/no-useless-constructor': 'warn',
  '@typescript-eslint/consistent-type-imports': 'warn',
  'default-param-last': 'off',
  '@typescript-eslint/default-param-last': 'error',
  '@typescript-eslint/explicit-function-return-type': [
    'warn',
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    },
  ],
  '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
  'no-empty-function': 'off',
  '@typescript-eslint/no-empty-function': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-implicit-any-catch': 'warn',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
  '@typescript-eslint/no-empty-interface': [
    'warn',
    {
      allowSingleExtends: true,
    },
  ],
  '@typescript-eslint/prefer-ts-expect-error': 'error',
  '@typescript-eslint/naming-convention': [
    'warn',
    {
      selector: 'variable',
      types: ['boolean'],
      format: ['PascalCase'],
      prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'are'],
    },
    {
      selector: 'variable',
      types: ['boolean'],
      modifiers: ['destructured'],
      format: null,
    },
  ],
  'brace-style': 'off',
  '@typescript-eslint/brace-style': 'warn',
  'no-dupe-class-members': 'off',
  '@typescript-eslint/no-dupe-class-members': 'error',
  'no-duplicate-imports': 'off',
  '@typescript-eslint/no-duplicate-imports': 'warn',
  'no-extra-parens': 'off',
  '@typescript-eslint/no-extra-parens': 'warn',
  'no-extra-semi': 'off',
  '@typescript-eslint/no-extra-semi': 'warn',
  'no-loss-of-precision': 'off',
  '@typescript-eslint/no-loss-of-precision': 'error',
  '@typescript-eslint/no-misused-new': 'error',
  '@typescript-eslint/no-misused-promises': 'warn',
  'no-redeclare': 'off',
  '@typescript-eslint/no-redeclare': 'warn',
  '@typescript-eslint/no-require-imports': 'warn',
  'no-throw-literal': 'off',
  '@typescript-eslint/no-throw-literal': 'warn',
  '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
  '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-var-requires': 'error',
  '@typescript-eslint/prefer-as-const': 'error',
  '@typescript-eslint/prefer-includes': 'warn',
  '@typescript-eslint/prefer-namespace-keyword': 'error',
  '@typescript-eslint/prefer-optional-chain': 'warn',
  'require-await': 'off',
  '@typescript-eslint/require-await': 'warn',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/restrict-template-expressions': [
    'error',
    {
      allowNullish: true,
      allowAny: true,
      allowNumber: true,
      allowBoolean: true,
    },
  ],
  'no-return-await': 'off',
  '@typescript-eslint/return-await': 'warn',
  '@typescript-eslint/triple-slash-reference': 'error',
  '@typescript-eslint/unbound-method': 'off',
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': true,
      'ts-nocheck': true,
      'ts-check': false,
      minimumDescriptionLength: 10,
    },
  ],
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': 'off', // ts(6133)
}
