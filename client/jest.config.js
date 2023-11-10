const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    'modularize-import-loader.*!(@headlessui/react)': '@headlessui/react',
  },

  // Add coverage configurations
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts', // Exclude TypeScript declaration files
    '!src/app/layout.tsx', // Exclude problematic file
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  coveragePathIgnorePatterns: ['src/app/api/auth/'],
};

module.exports = createJestConfig(customJestConfig);
