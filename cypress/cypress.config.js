const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Base URL de tu aplicación
    baseUrl: "http://localhost:4200",
    // Otras configuraciones
    supportFile: "cypress/support/e2e.js",
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
