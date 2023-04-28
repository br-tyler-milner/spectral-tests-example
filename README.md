# spectral-tests-example
A basic project to unit test custom [Spectral](https://github.com/stoplightio/spectral) rules using [TypeScript](https://www.typescriptlang.org) and [Jest](https://jestjs.io).

## Getting Started
1. Install [Node.js](https://nodejs.org) if it's not already installed (recommend installation via a version manager like [nvm](https://github.com/nvm-sh/nvm)).
2. Install dependencies: `npm install`.
3. Run tests: `npm test`.

## Project Structure
### OpenAPI Specification
A basic OpenAPI 3 file based on the [Swagger Petstore example](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml) has been setup in `reference/openapi.yaml`.

### Spectral Ruleset
A basic Spectral ruleset has been created in the root of the repo as `.spectral.yaml`.

### Tests
Tests have been setup inside of the `__tests__` folder based on Phil Sturgeon's [Testing Spectral Style Guides with Jest](https://apisyouwonthate.com/blog/testing-spectral-style-guides-with-jest/).
