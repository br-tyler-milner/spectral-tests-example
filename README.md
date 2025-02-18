# spectral-tests-example
A basic project showing how to to unit test custom [Spectral](https://github.com/stoplightio/spectral) rules using [TypeScript](https://www.typescriptlang.org) and [Jest](https://jestjs.io). The overall approach is based on Phil Sturgeon's [Testing Spectral Style Guides with Jest](https://apisyouwonthate.com/blog/testing-spectral-style-guides-with-jest/).

## About This Project
This project explores 3 approaches to creating unit tests for custom Spectral rulesets via the following branches:
1. **main** - Ruleset defined in `.spectral.yaml` YAML file. Here, TypeScript is only used for the unit tests themselves and the ruleset is defined in YAML (JSON would probably work as well). This is probably a bit closer to what someone would encounter when building out a Spectral ruleset for the first time by following the [Spectral documentation](https://docs.stoplight.io/docs/spectral/674b27b261c3c-overview#1-create-a-local-ruleset).
2. **typescript-ruleset** - Ruleset defined in `ruleset.ts` TypeScript file. This mirrors the approach outlined in Phil Sturgeon's article above. The benefit to this approach is the ability for TypeScript to provide basic type checking for the ruleset definition itself. However, it is perhaps less friendly to those that already have a `.spectral.yaml` or are new to API linting using Spectral due to the need for some background in TypeScript.
3. **typescript-ruleset_typescript-custom-functions** - An advanced version of **typescript-ruleset** where TypeScript is also used for [custom functions](https://docs.stoplight.io/docs/spectral/a781e290eb9f9-custom-functions). The overall integration of TypeScript into the dev environment is also more complete, with `tsup` used to compile/bundle the TypeScript ruleset into a JavaScript ruleset ready for use with the Spectral CLI (based on [spectral-owasp-ruleset](https://github.com/stoplightio/spectral-owasp-ruleset)).

## Getting Started
1. Install [Node.js](https://nodejs.org) if it's not already installed (recommend installation via a version manager like [nvm](https://github.com/nvm-sh/nvm)).
2. Install dependencies: `npm install`.
3. Run tests: `npm test`.

## Project Structure
### OpenAPI Specification
A basic OpenAPI 3 file based on the [Swagger Petstore example](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml) has been setup in `reference/openapi.yaml`.

This API spec is more to demonstrate an expected project structure and isn't necessarily used by the tests. By default, Stoplight Studio will create your OpenAPI specs inside of a `reference` folder.

You can also manually lint this API spec by installing the [Spectral CLI](https://github.com/stoplightio/spectral#-installation) and then running `spectral lint reference/openapi.yaml`.

### Spectral Ruleset
A basic Spectral ruleset has been created in the root of the repo as `.spectral.yaml`. The ruleset inherits from the default Spectral "oas" ruleset and also defines one custom rule, `response-must-have-500`.

### Tests
Tests have been setup inside of the `__tests__` folder. Since this just a simple example, there is only one test file - `response-must-have-500.test.ts`. There is also a test helper setup in `__helpers__/helper.ts` based on [Testing Spectral Style Guides with Jest](https://apisyouwonthate.com/blog/testing-spectral-style-guides-with-jest/).

#### Test Helper Updates for Loading YAML Ruleset
Some minor updates have been made to `helper.ts` to load the style guide ruleset from a `.spectral.yaml` file using [@stoplight/spectral-ruleset-bundler
](https://www.npmjs.com/package/@stoplight/spectral-ruleset-bundler) rather than from a `ruleset.ts` file. The primary change involved use of the `bundleAndLoadRuleset()` function to load the YAML ruleset rather than being able to directly use the ruleset exported from `ruleset.ts`.

Additionally, in order to get the `spectral-ruleset-bundler` package to compile properly with TypeScript, it was also necessary to introduce a `tsconfig.json` file with the following contents:
```json
{
    "compilerOptions": {
        "moduleResolution": "node16"
    }
}
```

The `tsconfig.json` configured as above avoids the following error when running `npm test`:
```
error TS2307: Cannot find module '@stoplight/spectral-ruleset-bundler/with-loader' or its corresponding type declarations.
```
