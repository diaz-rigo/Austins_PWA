import { configs } from "@typescript-eslint/eslint-plugin";

export default [
  // Aquí usamos directamente la configuración que queremos extender
  configs.recommended,
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
    },
    rules: {
      // Tus reglas personalizadas aquí
      "semi": ["error", "always"],
      "quotes": ["error", "single"]
    },
  },
];
