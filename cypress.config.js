const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs:true,// This tag is added so user can run all scripts through UI using one click
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      URL: 'https://dev.cudacartagetms.com/log-in',
      shipment_baseURL: 'https://dev.cudacartagetms.com/admin/shipments?page=1'
    },
    reporter: 'cypress-mochawesome-reporter', // Specify the reporter
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: true,
      html: true,
      json: true
    },
  },
});
