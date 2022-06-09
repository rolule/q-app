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
};
