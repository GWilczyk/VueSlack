module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'vue/require-default-prop': 'off'
  }
}
