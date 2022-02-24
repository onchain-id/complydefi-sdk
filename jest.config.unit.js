module.exports = {
  coverageThreshold: { './src': { branches: 90, functions: 90, lines: 90, statements: 90 } },
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['jest-extended'],
  testMatch: ['**/*.specs.ts'],
  transform: { '^.+\\.ts$': 'ts-jest' },
};
