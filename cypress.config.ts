import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://austins.vercel.app', // Configura la URL base para tus pruebas e2e
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Patrón de archivos de prueba
    supportFile: 'cypress/support/e2e.ts', // Archivo de soporte para configuración global
    setupNodeEvents(on, config) {
      // Aquí puedes implementar eventos de Node para manejar tareas antes, durante o después de las pruebas.
      // Ejemplo: Manejar captura de pantallas o generar reportes de prueba
    },
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack", // Define el framework Angular con el bundler Webpack
    },
    specPattern: "**/*.cy.ts", // Archivos de prueba de componentes específicos
  },
});
