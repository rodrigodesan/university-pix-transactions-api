module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    quotes: 'off',
    'class-methods-use-this': 'off',
    'import/first': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-plusplus': 0,
    'quote-props': 0,
  },
};
