import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 639,
  e2e: {
    // To override the default browser security and cross-origin issue
    chromeWebSecurity: false,
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on,config) {
    },
    // For recoard and play
    experimentalStudio: true,
  },
});
