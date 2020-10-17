const fs = require('fs');

const projectDir = require('./src/utils/projectDir');

const getModuleNames = (dir, firstLetterUpper = false) =>
  fs
    .readdirSync(dir)
    .map(file => (file.endsWith('.js') ? file.substring(0, file.length - 3) : file))
    .filter(file => file !== 'index')
    .map(file => (firstLetterUpper ? `${file[0].toUpperCase()}${file.substr(1)}` : file));

const models = getModuleNames(`${projectDir}/src/database/models`, true);
const utils = getModuleNames(`${projectDir}/src/utils`, false);

module.exports = {
  extends: ['eslint:recommended', 'airbnb', 'prettier', 'prettier/flowtype'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {}
    }
  },
  globals: {
    globalThis: 'readonly',
    log: 'readonly',
    logError: 'readonly',
    ...Object.fromEntries(models.map(model => [model, 'readonly'])),
    ...Object.fromEntries(utils.map(util => [util, 'readonly']))
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 9
  },
  plugins: ['react', 'prettier', 'flowtype'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': 0,
    'no-loop-func': 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-unused-expressions': 'off',
    'global-require': 'off',
    'comma-dangle': ['error', 'never'],
    'arrow-parens': 'off',
    'import/no-dynamic-require': 'off',
    'max-len': [2, 132, 8],
    'prettier/prettier': [
      'error',
      {
        printWidth: 110,
        singleQuote: true,
        endOfLine: 'auto'
      }
    ],
    'no-invalid-this': 'off',
    'consistent-return': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/default': 'off',
    'import/namespace': 'off',
    'import/no-absolute-path': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-useless-path-segments': 'off',
    'import/no-self-import': 'off',
    'import/no-duplicates': 'off',
    'import/order': 'off',
    'import/export': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to']
      }
    ],
    'react/destructuring-assignment': 'off',
    'import/no-cycle': 'off'
  }
};
