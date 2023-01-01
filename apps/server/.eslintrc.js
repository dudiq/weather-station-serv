module.exports = {
  extends: ['@local-weather/eslint-config/remix'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
