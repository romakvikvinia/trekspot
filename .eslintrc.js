module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
      browser: true,
      node: true,
      es6: true,
      'react-native/react-native': true,
    },
    extends: [
      'prettier',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    globals: {
      Platform: 'readonly',
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    overrides: [],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['react', 'react-native', '@typescript-eslint', 'simple-import-sort', 'unused-imports'],
    rules: {
      'react-native/no-unused-styles': 2,
      'react-native/split-platform-components': 2,
      'react-native/no-inline-styles': 'off',
      'react-native/no-color-literals': 'off',
      'react-native/no-raw-text': 2,
      'react-native/sort-styles': [
        'error',
        'asc',
        {
          ignoreClassNames: false,
          ignoreStyleProperties: false,
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'react/prop-types': 'off',
      'no-empty-pattern': 'off',
    },
  };
  