module.exports = {
  roots: ['<rootDir>/test'],
  setupFilesAfterEnv: ['jest-extended'],
  testMatch: ['**/*.e2e.ts'],
  transform: { '^.+\\.ts$': 'ts-jest' },
};
