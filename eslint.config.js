const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginCypress = require('eslint-plugin-cypress');
const globals = require('globals');

module.exports = [
  {
    ignores: ['**/node_modules/', 'cypress/videos/', 'cypress/screenshots/', '**/screenshots/', '**/allure-report/', '**/allure-results/'],
  },
  {

    files: ['*.js', '*.ts'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      env: {
        browser: true,
        node: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      cypress: eslintPluginCypress,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'cypress/no-unnecessary-waiting': 'warn',
    },
    extends: [eslintConfigPrettier],
  },
];
