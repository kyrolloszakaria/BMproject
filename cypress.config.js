const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "8z35kg",
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    watchForFileChanges :	false,
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Transfer Funds',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      
    },
  },
});
