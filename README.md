# spectral-tests-example

A basic project showing how to to unit test custom
[Spectral](https://github.com/stoplightio/spectral) rules using
[TypeScript](https://www.typescriptlang.org) and [Jest](https://jestjs.io). The
overall approach is based on Phil Sturgeon's
[Testing Spectral Style Guides with Jest](https://apisyouwonthate.com/blog/testing-spectral-style-guides-with-jest/).

## About This Project

This project explores 3 approaches to creating unit tests for custom Spectral
rulesets via the following branches:

1. **main** - Ruleset defined in `.spectral.yaml` YAML file. Here, TypeScript is
   only used for the unit tests themselves and the ruleset is defined in YAML
   (JSON would probably work as well). This is probably a bit closer to what
   someone would encounter when building out a Spectral ruleset for the first
   time by following the
   [Spectral documentation](https://docs.stoplight.io/docs/spectral/674b27b261c3c-overview#1-create-a-local-ruleset).
2. **typescript-ruleset** - Ruleset defined in `ruleset.ts` TypeScript file.
   This mirrors the approach outlined in Phil Sturgeon's article above. The
   benefit to this approach is the ability for TypeScript to provide basic type
   checking for the ruleset definition itself. However, it is perhaps less
   friendly to those that already have a `.spectral.yaml` or are new to API
   linting using Spectral due to the need for some background in TypeScript.
3. **typescript-ruleset_typescript-custom-functions** - An advanced version of
   **typescript-ruleset** where TypeScript is also used for
   [custom functions](https://docs.stoplight.io/docs/spectral/a781e290eb9f9-custom-functions).
   The overall integration of TypeScript into the dev environment is also more
   complete, with `tsup` used to compile/bundle the TypeScript ruleset into a
   JavaScript ruleset ready for use with the Spectral CLI (based on
   [spectral-owasp-ruleset](https://github.com/stoplightio/spectral-owasp-ruleset)).

## Getting Started

1. Install [Node.js](https://nodejs.org) if it's not already installed
   (recommend installation via a version manager like
   [nvm](https://github.com/nvm-sh/nvm)).
2. Install dependencies: `npm install`.
3. Run tests: `npm test`.

## Project Structure

### OpenAPI Specification

A basic OpenAPI 3 file based on the
[Swagger Petstore example](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)
has been setup in `reference/openapi.yaml`.

This API spec is more to demonstrate an expected project structure and isn't
necessarily used by the tests. By default, Stoplight Studio will create your
OpenAPI specs inside of a `reference` folder.

You can also manually lint this API spec:

1. Install the
   [Spectral CLI](https://github.com/stoplightio/spectral#-installation):
   `npm install -g @stoplight/spectral-cli`.
2. Build the project: `npm run build`.
3. Run Spectral against the OpenAPI spec using the generated ruleset:
   `spectral lint reference/openapi.yaml --ruleset dist/ruleset.js`.

### Spectral Ruleset

A basic Spectral ruleset has been created in `src/ruleset.ts`. The ruleset
inherits from the default Spectral "oas" ruleset and also defines the following
custom rules:

- `response-must-have-500` - a basic rule that uses Spectral's built-in
  `defined` and `pattern` functions.
- `http-status-obsolete` - an advanced rule that uses a custom
  TypeScript/JavaScript function defined in `src/functions/myCustomFunction.ts`
  (based on
  [Postman's Spectral custom functions documentation](https://learning.postman.com/docs/api-governance/configurable-rules/spectral/#spectral-custom-functions)).

### Tests

Tests have been setup inside of the `__tests__` folder -
`response-must-have-500.test.ts` and `http-status-obsolete.test.ts`. There is
also a test helper setup in `__tests__/__helpers__/helper.ts` based on
[Testing Spectral Style Guides with Jest](https://apisyouwonthate.com/blog/testing-spectral-style-guides-with-jest/).

#### Ruleset Bundler Dependency

Since this approach uses a `ruleset.ts` file rather than a `.spectral.yaml`
file, the
[@stoplight/spectral-ruleset-bundler](https://www.npmjs.com/package/@stoplight/spectral-ruleset-bundler)
dependency defined in `package.json` is technically not necessary for this
version of the project and has been removed. The
`@stoplight/spectral-ruleset-bundler` is only necessary when needing to load a
YAML ruleset as is done in the `main` branch. As such, you will need to
reinstall the dependencies when switching between branches:

```Shell
npm install
```

### Dependencies

See below for a quick rundown of the dependencies in use:

**Main - Ruleset:**

- `@stoplight/spectral-formats` - formats that Spectral supports (e.g. OpenAPI,
  AsyncAPI, etc.)
- `@stoplight/spectral-functions` - built-in Spectral functions that allow for
  creating linter rules (e.g. `truthy`, `length`, `pattern`, etc.)
- `@stoplight/spectral-rulesets` - built-in [Spectral "oas" ruleset](https://docs.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules) that our custom ruleset extends

**Development - Typing:**

- `typescript` - static typing for JavaScript

**Development - Testing:**

- `@stoplight/types` - Spectral types, used in rule unit tests
- `@types/jest` - Jest types, used to create units tests using Jest
- `jest` - Unit testing library for JavaScript
- `ts-jest` - enables TypeScript support for Jest
- `ts-node` - enables TypeScript configuration file support for Jest
  (`jest.config.ts`)

**Development - Linting:**

- `@eslint/js` - ESLint provided/recommended JavaScript rules
- `@typescript-eslint/eslint-plugin` - TypeScript plugin to enable TypeScript
  support for ESLint
- `@typescript-eslint/parser` - TypeScript parser to enable TypeScript support
  for ESLint
- `eslint` - JavaScript/TypeScript linter for linting all JavaScript/TypeScript
  code
- `typescript-eslint` - enables TypeScript support for ESLint
- `jiti` - enables TypeScript configuration file support for ESLint
  (`eslint.config.ts`)

**Development - Formatting:**

- `@types/eslint-config-prettier` - type definitions for
  `eslint-config-prettier` package
- `eslint-config-prettier` - ESLint config that disables ESLint rules that may
  conflict with `prettier`
- `prettier` - JavaScript/TypeScript formatter

**Development - Building:**

- `tsup` - build tool used to package up the `ruleset.ts` into a JavaScript
  ruleset definition that Spectral can use
