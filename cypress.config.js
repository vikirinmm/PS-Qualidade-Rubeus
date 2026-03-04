const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true
  },

  video: true,
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: "https://qualidade.apprbs.com.br"
  }
});