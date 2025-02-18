import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { ecmaVersion: 2022 } },
  pluginJs.configs.recommended, // ESLint predefined recommended config
  ...tseslint.configs.recommended, // TypeScript recommended config
];