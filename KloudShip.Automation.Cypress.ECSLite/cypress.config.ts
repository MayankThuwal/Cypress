import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 639,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    // To override the default browser security and cross-origin issue
    chromeWebSecurity: false,
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    // For recoard and play
    experimentalStudio: true,
  },
});
