module.exports = {
  env: {
    browser: true,
    es6: true,
    'node': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    // options
    'no-restricted-syntax': ['error', 'WithStatement', "BinaryExpression[operator=' in ']"],
    'brace-style': ['error', 'stroustrup', {
      allowSingleLine: true
    }],
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'func-names': [0, 'as-needed'],
    'space-in-parens': ['error', 'never', {
      exceptions: ['{}', '[]', '()']
    }],
    // start
    'no-multiple-empty-lines': ['error', {
      max: 1
    }],
    'padding-line-between-statements': ['error', {
      blankLine: 'always',
      prev: ['*'],
      next: 'return'
    }],
    'newline-before-return': 2,
    'quotes': [2, 'single', { 'avoidEscape': true }],
    // rules
    'no-trailing-spaces': 0,
    'no-var': 2,
    'no-multi-spaces': 'error',
    // 'no-multiple-empty-lines': 'error',
    'prefer-const': 0,
    'no-use-before-define': 0,
    'consistent-return': 2,
    indent: [1, 2],
    'no-else-return': 1,
    semi: [1, 'always'],
    'space-unary-ops': 2,
    'no-alert': 0,
    'no-console': 0,
    strict: 0,
    'linebreak-style': 0,
    'no-unused-vars': 1,
    'no-underscore-dangle': 0,
    eqeqeq: ['error', 'always'],
    'guard-for-in': 0,
    'no-continue': 0,
    'no-debugger': 0,
    'no-plusplus': 0,
    'no-mixed-spaces-and-tabs': ['error'],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-curly-spacing': [2, 'always'],
    'react/jsx-equals-spacing': [2, 'always']
  }
};

// 'react/jsx-curly-spacing': [2, {'when': 'always', 'spacing': {
//   'objectLiterals': 'never'
// }}]
