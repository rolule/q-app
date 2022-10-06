/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ['incloud/react'],
  settings: {
    'import/resolver': {
      // eslint-import-resolver-typescript is required
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  plugins: ['unused-imports'],
  rules: {
    // unused imports have to be removed
    'unused-imports/no-unused-imports-ts': 'error',

    // empty tags have to be closed
    'react/self-closing-comp': ['error'],
  },
};
