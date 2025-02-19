import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import type { Linter } from "eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] }, // Apply to all JavaScript/TypeScript files (including configuration files)
  { languageOptions: { ecmaVersion: 2022 } }, // Match target in tsconfig.json / tsup.config.ts
  pluginJs.configs.recommended, // ESLint predefined recommended config
  ...tseslint.configs.recommended, // TypeScript recommended config
] as Linter.Config[];
