module.exports = {
  extends: ['@local-weather/eslint-config/typescript'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
