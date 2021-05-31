'use strict';

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-unused-vars': 'off',
    'vue/attributes-order': [
      'error',
      {
        'alphabetical': true
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        'singleline': 1,
        'multiline': {
          'max': 1
        }
      }
    ],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never'
    }],
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1
    }],
    "vue/html-indent": ["error", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "alignAttributesVertically": true
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-trailing-spaces': 'error'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
