// eslint.config.js
export default [
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        browser: true,
        node: true,
        es6: true,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
    ignores: [
      // Ignorar la carpeta dist y otros patrones según sea necesario
      "dist/**/*",
      "node_modules/**/*",
      "**/*.min.js", // Ignorar archivos minificados
    ],
  },
];
