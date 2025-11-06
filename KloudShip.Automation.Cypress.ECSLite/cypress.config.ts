import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 639,
  e2e: {
    // To override the default browser security and cross-origin issue
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
    },
    // For recoard and play
    experimentalStudio: true,
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true
  },
});
