const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const { json } = require("stream/consumers");

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs:true,// This tag is added so user can run all scripts through UI using one click
    setupNodeEvents(on, config) {
      on('task', {
        writeFile({ fileName, data}){
          fs.writeFileSync(path.resolve(fileName), JSON.stringify(data, null, 2), 'utf-8');
          return null;
        }
      });

      return config;
    },
    env: {
      URL: 'https://www.google.co.uk/', //Modify the URL for Cypress to visit the appropriate website accordingly.
      shipment_baseURL: 'https://www.google.co.uk/', //Adjust the website URL accordingly for assertions.
      routeToQuote: 'https://www.google.co.uk/' //Adjust the website URL accordingly for assertions.
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
