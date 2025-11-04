// Dynamically load the appsettings file based on the ENV environment variable
const env = (Cypress.env('ENV') || 'dev').toLowerCase();

export const ENV = require(`./app-settings.${env}.json`); 

