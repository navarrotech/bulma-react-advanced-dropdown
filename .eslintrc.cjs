// Copyright © 2024 Navarrotech

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    'vite-env.d.ts',
    '.eslintrc.cjs',
    'forge.config.ts',
    'schema.d.ts',
    'routes.ts',
    'ProtoTypes.ts',
    'node_modules',
    '.json'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'header',
    '@stylistic/js',
    'i18next'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    //////////////////////////////////////////
    // Typescript rules:

    // Disallow any https://typescript-eslint.io/rules/no-explicit-any/
    '@typescript-eslint/no-explicit-any': 'off',
    // Allow ts-ignore https://typescript-eslint.io/rules/ban-ts-comment/
    '@typescript-eslint/ban-ts-comment': 'warn',

    //////////////////////////////////////////
    // Enforcing internationalization

    // No literal strings https://www.npmjs.com/package/eslint-plugin-i18next
    // This helps to ensure that this package will never conflict with adopter's internationalization
    'i18next/no-literal-string': 'error',

    //////////////////////////////////////////
    // Enforcing consistency

    // Enforce single quotes https://eslint.org/docs/latest/rules/quotes
    quotes: ['error', 'single'],
    // Enforce 2 spaces https://eslint.org/docs/latest/rules/indent
    indent: ['error', 2],
    // Enforce no comma dangling https://eslint.org/docs/latest/rules/comma-dangle
    'comma-dangle': ['error', 'never'],
    // Camel case! https://eslint.org/docs/latest/rules/camelcase
    camelcase: 'error',
    // No unused vars https://eslint.org/docs/latest/rules/no-unused-vars
    // Disabling this, in light of the next rule which is more specific to typescript
    'no-unused-vars': 'off',
    // https://stackoverflow.com/a/61555310/9951599
    '@typescript-eslint/no-unused-vars': ['error'],
    // No useless escape https://eslint.org/docs/latest/rules/no-useless-escape
    'no-useless-escape': 'error',
    // Disable vars https://eslint.org/docs/latest/rules/no-var
    'no-var': 'error',
    // Disable yoda https://eslint.org/docs/latest/rules/yoda
    yoda: 'error',
    // Disable semi colons https://eslint.org/docs/latest/rules/semi
    semi: ['error', 'never'],
    // Ensure that we're using curly braces for all lines https://eslint.org/docs/latest/rules/curly
    'curly': ['error', 'all'],
    // No single-line magic: https://eslint.org/docs/latest/rules/brace-style
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': false }],
    // End of line https://eslint.style/packages/js
    // Depreciated original package: (https://eslint.org/docs/latest/rules/eol-last)
    '@stylistic/js/eol-last': ['error', 'always'],
    // Enforce spacing https://eslint.org/docs/latest/rules/keyword-spacing
    'keyword-spacing': ['error', { before: true, after: true }],
    // Array and object spacing https://eslint.org/docs/latest/rules/array-bracket-spacing
    'array-bracket-spacing': [
      'error',
      'always',
      {
        objectsInArrays: false,
        arraysInArrays: false,
      },
    ],
    // Object curly spacing https://eslint.org/docs/latest/rules/object-curly-spacing
    'object-curly-spacing': [
      'error',
      'always',
      {
        objectsInObjects: false,
        arraysInObjects: false,
      },
    ],
    'no-console': 'off',

    //////////////////////////////////////////
    // Best practices

    'react-refresh/only-export-components': 'error',
    'react-hooks/exhaustive-deps': 'error',

    // Custom plugin: https://www.npmjs.com/package/eslint-plugin-header
    // We should be enforcing a copyright header on all files
    'header/header': ['error', 'line', [
      {
        pattern: 'Copyright © \\d{4} Navarrotech',
        template: 'Copyright © 2024 Navarrotech'
      }
    ]],
  },
};
