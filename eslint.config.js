module.exports = {
  parser: '@typescript-eslint/parser', // Definir el analizador para TypeScript
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Usar las recomendaciones de @typescript-eslint
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Aquí puedes agregar o sobrescribir reglas específicas
  },
  ignores: ['node_modules'], // Ignorar la carpeta node_modules
};
