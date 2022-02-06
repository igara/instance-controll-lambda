const path = require('path');

module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  testMatch: ['**/__tests__/**/*.*(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.(ts)$': [
      'esbuild-jest',
      {
        sourcemap: 'both',
      },
    ],
  },
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {},
  globals: {
    'esbuild-jest': {
      tsconfig: path.join(__dirname, 'jest.tsconfig.json'),
      diagnostics: false,
    },
  },
  collectCoverageFrom: ['**/*.{ts}', '!**/node_modules/**'],
};
