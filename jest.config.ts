// Basic Jest configuration file.
// See https://jestjs.io/docs/configuration.

import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest', // Needed for Jest + TypeScript (see https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file)
    testEnvironment: 'node', // Technically not needed since default test environment is node
    testPathIgnorePatterns: ['__helpers__'], // Don't look for tests in __helpers__ directory
    verbose: true, // Verbose output to help with debugging
    transform: {
      // Use isolated modules to improve test run time
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          isolatedModules: true,
        },
      ],
    },
    moduleNameMapper: {
      // Remove .js extension from imports to fix Jest "cannot find module" error (https://stackoverflow.com/a/77852936)
      '(.+)\\.js': '$1',
    },
  }
}
