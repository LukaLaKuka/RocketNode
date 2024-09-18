import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    rules: {
      semi: ["error", "always"],
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    languageOptions: { globals: globals.node }
  },
  {
    ignores: [
      "**/*.d.ts",
      "dist/**",
      "node_modules/**",
      "tests/**",
      "jest.config.ts"
    ]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];