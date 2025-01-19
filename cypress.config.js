const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://meus-emprestimos.picpay.com',
    viewportWidth: 1366,
    viewportHeight: 648,
    defaultCommandTimeout: 20000,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'screenshots/',
    experimentalOriginDependencies: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
