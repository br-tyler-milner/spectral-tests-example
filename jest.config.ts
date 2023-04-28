import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['__helpers__'],
    verbose: true,
  };
};