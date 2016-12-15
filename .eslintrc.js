module.exports = {
  extends: [
    'airbnb',
    'plugin:lodash/recommended'
  ],
  plugins: [
    'lodash'
  ],
  parser: 'babel-eslint',
  rules: {
    'arrow-body-style': 0,
    'import/extensions': [2, 'never'],
    'import/no-extraneous-dependencies': 0,
    'lodash/prefer-constant': 0,
    'lodash/prefer-lodash-method': 0,
    'lodash/prefer-invoke-map': 0,
    'lodash/prefer-noop': 0,
    'max-len': [2, 120],
    'no-confusing-arrow': 0,
    'no-mixed-operators': 0,
    'no-nested-ternary': 0,
    'no-return-assign': 0,
    'no-plusplus': 0,
    'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }],
    'semi': [2, 'never'],
  }
}
