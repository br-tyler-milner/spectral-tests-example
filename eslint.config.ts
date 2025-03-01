import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import type { Linter } from 'eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] }, // Apply to all JavaScript/TypeScript files (including configuration files)
  { languageOptions: { ecmaVersion: 2022 } }, // Match target in tsconfig.json / tsup.config.ts
  { ignores: ['node_modules', 'dist', 'public-rulesets'] }, // Ignore these directories
  pluginJs.configs.recommended, // ESLint predefined recommended config
  ...tseslint.configs.recommended, // TypeScript recommended config
  eslintConfigPrettier, // Turns off ESLint rules that conflict with Prettier
] as Linter.Config[]
