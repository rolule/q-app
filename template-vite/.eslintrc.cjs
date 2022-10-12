/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  settings: {
    'import/resolver': {
      // eslint-import-resolver-typescript is required
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },

    react: {
      version: 'detect',
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'QLink', linkAttribute: 'to' },
      ],
    },
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  root: true,

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },
  ],

  extends: [
    // use eslint recommended rules
    'eslint:recommended',

    // TypeScript rules
    // see https://typescript-eslint.io/
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',

    // import rules
    // see https://github.com/import-js/eslint-plugin-import
    'plugin:import/recommended',
    'plugin:import/typescript',

    // React rules
    // see https://github.com/jsx-eslint/eslint-plugin-react
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',

    // React hooks rules
    // see https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
    'plugin:react-hooks/recommended',

    // accessibility rules
    'plugin:jsx-a11y/recommended',

    // prettier recommended config
    // see https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    'plugin:prettier/recommended',
  ],

  plugins: [
    // used for auto-fixing unused imports
    // see https://github.com/sweepline/eslint-plugin-unused-imports
    'unused-imports',
  ],

  rules: {
    /**
     * eslint rules
     */

    //
    'arrow-body-style': ['error', 'as-needed'],

    //
    'no-console': ['error', { allow: ['error', 'warn'] }],

    /**
     * typescript-eslint rules
     */

    // turn this rule of, because it is overridden by unused-imports/no-unused-vars
    '@typescript-eslint/no-unused-vars': 'off',

    //
    '@typescript-eslint/naming-convention': [
      'error',

      // enforce that all interfaces are prefixed with `I` and use PascalCase
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },

      // enforce that boolean variables are prefixed with an allowed verb
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },

      // enforce that type parameters (generics) are prefixed with T
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
    ],

    // do not require explicit return and argument types on exported functions' and classes' public class methods
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // this rule enforces consistent use of types and interfaces
    // it causes a lot of false positives: we leave it up to the programmer to decide
    '@typescript-eslint/consistent-type-definitions': 'off',

    // enforce consistent usage of type exports
    '@typescript-eslint/consistent-type-exports': [
      'error',
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],

    // enforce consistent usage of type imports
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: true },
    ],

    // require a consistent member declaration order
    '@typescript-eslint/member-ordering': 'warn',

    // enforce using a particular method signature syntax
    '@typescript-eslint/method-signature-style': ['warn', 'property'],

    // require expressions of type void to appear in statement position
    '@typescript-eslint/no-confusing-void-expression': [
      'warn',
      { ignoreArrowShorthand: true, ignoreVoidOperator: true },
    ],

    // disallow members of unions and intersections that do nothing or override type information
    '@typescript-eslint/no-redundant-type-constituents': 'warn',

    // disallow invocation of `require()`
    '@typescript-eslint/no-require-imports': 'error',

    // disallow unnecessary namespace qualifiers
    '@typescript-eslint/no-unnecessary-qualifier': 'warn',

    // disallow empty exports that don't change anything in a module file
    '@typescript-eslint/no-useless-empty-export': 'warn',

    // require each enum member value to be explicitly initialized
    '@typescript-eslint/prefer-enum-initializers': 'error',

    // require private members to be marked as `readonly` if they're never modified outside of the constructor
    '@typescript-eslint/prefer-readonly': 'warn',

    // enforce RegExp#exec over String#match if no global flag is provided
    '@typescript-eslint/prefer-regexp-exec': 'warn',

    // require any function or method that returns a Promise to be marked async
    '@typescript-eslint/promise-function-async': 'error',

    // require Array#sort calls to always provide a compareFunction
    '@typescript-eslint/require-array-sort-compare': [
      'warn',
      { ignoreStringArrays: true },
    ],

    // enforce members of a type union/intersection to be sorted alphabetically
    '@typescript-eslint/sort-type-union-intersection-members': 'warn',

    // require switch-case statements to be exhaustive with union type
    '@typescript-eslint/switch-exhaustiveness-check': 'warn',

    /**
     * react-app rules
     */

    // empty tags have to be closed
    'react/self-closing-comp': ['error'],

    /**
     * import rules
     */

    //
    'import/no-default-export': 'error',

    //
    'import/order': ['error', { alphabetize: { order: 'asc' } }],

    /**
     * unused-imports rules
     */

    // unused imports have to be removed
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}
