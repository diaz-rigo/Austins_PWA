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
    ignores: ["dist/**/*"], // Ignora todos los archivos en la carpeta dist
  },
];
