# spectral-tests-example
A basic project showing how to to unit test custom [Spectral](https://github.com/stoplightio/spectral) rules using [TypeScript](https://www.typescriptlang.org) and [Jest](https://jestjs.io). The overall approach is based on Phil Sturgeon's [Testing Spectral Style Guides with Jest](https://apisyouwonthate.com/blog/testing-spectral-style-guides-with-jest/).

## Getting Started
1. Install [Node.js](https://nodejs.org) if it's not already installed (recommend installation via a version manager like [nvm](https://github.com/nvm-sh/nvm)).
2. Install dependencies: `npm install`.
3. Run tests: `npm test`.

## Project Structure
### OpenAPI Specification
A basic OpenAPI 3 file based on the [Swagger Petstore example](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml) has been setup in `reference/openapi.yaml`.

This spec is more to demonstrate an expected project structure and isn't necessarily used by the tests. By default, Stoplight Studio will create your OpenAPI specs inside of a `reference` folder.

You can also manually lint this API spec using the Spectral CLI by running `spectral lint reference/openapi.yaml`.

### Spectral Ruleset
A basic Spectral ruleset has been created in the root of the repo as `.spectral.yaml`. The ruleset inherits from the default Spectral "oas" ruleset and also defines one custom rule, `response-must-have-500`.

### Tests
Tests have been setup inside of the `__tests__` folder. Since this just a simple example, there is only one test file - `response-must-have-500.test.ts`. There is also a test helper setup in `__helpers__/helper.ts` based on [Testing Spectral Style Guides with Jest](https://apisyouwonthate.com/blog/testing-spectral-style-guides-with-jest/).
