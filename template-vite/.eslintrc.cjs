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

    'jsx-a11y': {
      components: {
        Button: 'button',
        Input: 'input',
        Image: 'img',
      },
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
    'plugin:jsx-a11y/strict',

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

    // disallow template literal placeholder syntax in regular strings
    'no-template-curly-in-string': 'warn',

    // enforce consistent brace style for all control statements
    curly: ['warn', 'all'],

    // equire the use of `===` and `!==`
    eqeqeq: ['error', 'smart'],

    // enforce dot notation whenever possible
    'dot-notation': 'warn',

    // disallow the use of `console`
    'no-console': ['error', { allow: ['error', 'warn'] }],

    // disallow shorthand type conversions
    'no-implicit-coercion': ['warn', { allow: ['!!'] }],

    // disable this because it is overridden by typescript-eslint
    'no-magic-numbers': 'off',

    // disable this because it is overridden by typescript-eslint
    'no-shadow': 'error',

    // require or disallow "Yoda" conditions
    yoda: 'error',

    // add an empty line before return statements
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],

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
    '@typescript-eslint/require-array-sort-compare': ['warn', { ignoreStringArrays: true }],

    // enforce members of a type union/intersection to be sorted alphabetically
    '@typescript-eslint/sort-type-union-intersection-members': 'warn',

    // require switch-case statements to be exhaustive with union type
    '@typescript-eslint/switch-exhaustiveness-check': 'warn',

    // disallow variable declarations from shadowing variables declared in the outer scope
    '@typescript-eslint/no-shadow': 'warn',

    // disallow magic numbers
    '@typescript-eslint/no-magic-numbers': [
      'warn',
      { ignoreArrayIndexes: true, ignore: [-1, 0, 1] },
    ],

    /**
     * React rules
     */

    // enforce a specific function type for function components
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // ensure destructuring and symmetric naming of useState hook value and setter variables (Option possible after next release)
    'react/hook-use-state': ['error' /* , { allowDestructuredState: true } */],

    // enforce sandbox attribute on iframe elements
    'react/iframe-missing-sandbox': 'warn',

    // disallow usage of Array index in keys
    'react/no-array-index-key': 'warn',

    // disallow usage of invalid attributes
    'react/no-invalid-html-attribute': 'warn',

    // disallow multiple component definition per file
    'react/no-multi-comp': ['error', { ignoreStateless: true }],

    // disallow `this` from being used in stateless functional components
    'react/no-this-in-sfc': 'error',

    // disallow creating unstable components inside components
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],

    // disallow extra closing tags for components without children
    'react/self-closing-comp': 'error',

    // disallow void DOM elements (e.g. <img />, <br />) from receiving children
    'react/void-dom-elements-no-children': 'error',

    /**
     * JSX specific rules
     */

    // enforce boolean attributes notation in JSX
    'react/jsx-boolean-value': 'error',

    // enforce or disallow spaces inside of curly braces in JSX attributes and expressions
    'react/jsx-child-element-spacing': 'warn',

    // disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX expressions on literals in JSX children or attributes
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never', propElementValues: 'always' },
    ],

    // enforce event handler naming conventions in JSX
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
        checkLocalVariables: true,
        checkInlineFunction: false,
      },
    ],

    // require or prevent a new line after jsx elements and expressions
    'react/jsx-newline': ['warn', { prevent: true, allowMultilines: true }],

    // disallows JSX context provider values from taking values that will cause needless rerenders
    'react/jsx-no-constructed-context-values': 'warn',

    // disallow unnecessary fragments
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],

    // enforce PascalCase for user-defined JSX components
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: false,
        allowNamespace: false,
        allowLeadingUnderscore: false,
        ignore: [],
      },
    ],

    // disallow JSX prop spreading
    'react/jsx-props-no-spreading': [
      'warn',
      {
        html: 'enforce',
        custom: 'ignore',
        explicitSpread: 'ignore',
        exceptions: [],
      },
    ],

    // enforce props alphabetical sorting
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: false,
        shorthandLast: true,
        multiline: 'ignore',
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: ['key'],
        locale: 'auto',
      },
    ],

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
