# spectral-tests-example
A basic project showing how to to unit test custom [Spectral](https://github.com/stoplightio/spectral) rules using [TypeScript](https://www.typescriptlang.org) and [Jest](https://jestjs.io). The overall approach is based on Phil Sturgeon's [Testing Spectral Style Guides with Jest](https://apisyouwonthate.com/blog/testing-spectral-style-guides-with-jest/).

## About This Project
This project explores 2 approaches to creating unit tests for custom Spectral rulesets via the following branches:
1. **typescript-ruleset** - Ruleset defined in `src/ruleset.ts` TypeScript file. This mirrors the approach outlined in Phil Sturgeon's article above. The benefit to this approach is the ability for TypeScript to provide basic type checking for the ruleset definition itself. However, it is perhaps less friendly to those that already have a `.spectral.yaml` or are new to API linting using Spectral due to the need for some background in TypeScript.
2. **main** - Ruleset defined in `.spectral.yaml` YAML file. Here, TypeScript is only used for the unit tests themselves and the ruleset is defined in YAML (JSON would probably work as well). This is probably a bit closer to what someone would encounter when building out a Spectral ruleset for the first time by following the [Spectral documentation](https://docs.stoplight.io/docs/spectral/674b27b261c3c-overview#1-create-a-local-ruleset).

## Getting Started
1. Install [Node.js](https://nodejs.org) if it's not already installed (recommend installation via a version manager like [nvm](https://github.com/nvm-sh/nvm)).
2. Install dependencies: `npm install`.
3. Run tests: `npm test`.

## Project Structure
### OpenAPI Specification
A basic OpenAPI 3 file based on the [Swagger Petstore example](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml) has been setup in `reference/openapi.yaml`.

This API spec is more to demonstrate an expected project structure and isn't necessarily used by the tests. By default, Stoplight Studio will create your OpenAPI specs inside of a `reference` folder.

You can also manually lint this API spec:
1. Install the [Spectral CLI](https://github.com/stoplightio/spectral#-installation): `npm install -g @stoplight/spectral-cli`.
2. Build the project: `npm run build`.
3. Run Spectral against the OpenAPI spec using the generated ruleset: `spectral lint reference/openapi.yaml --ruleset dist/ruleset.mjs`.

### Spectral Ruleset
A basic Spectral ruleset has been created in the root of the repo as `.spectral.yaml`. The ruleset inherits from the default Spectral "oas" ruleset and also defines one custom rule, `response-must-have-500`.

### Tests
Tests have been setup inside of the `__tests__` folder. Since this just a simple example, there is only one test file - `response-must-have-500.test.ts`. There is also a test helper setup in `__helpers__/helper.ts` based on [Testing Spectral Style Guides with Jest](https://apisyouwonthate.com/blog/testing-spectral-style-guides-with-jest/).

#### Ruleset Bundler Dependency
Since this approach uses a `ruleset.ts` file rather than a `.spectral.yaml` file, the [@stoplight/spectral-ruleset-bundler](https://www.npmjs.com/package/@stoplight/spectral-ruleset-bundler) dependency defined in `package.json` is technically not necessary for this version of the project and has been removed. The `@stoplight/spectral-ruleset-bundler` is only necessary when needing to load a YAML ruleset as is done in the `main` branch. As such, you will need to reinstall the dependencies when switching to this branch or back to the `main` branch:

```Shell
npm install
```

Additionally, the `main` branch also makes use of a `tsconfig.json` file in order to get the `spectral-ruleset-bundler` package to compile properly with TypeScript. Since this branch doesn't load a YAML ruleset, the `tsconfig.json` file has been omitted.
