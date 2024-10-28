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
    ignores: [
      "dist/", // Ignora todo el directorio 'dist'
    ],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
