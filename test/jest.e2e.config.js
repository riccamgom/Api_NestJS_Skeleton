module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '.e2e.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  //testResultsProcessor: 'jest-sonar-reporter',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts', // Exclude main.ts from test coverage
    '!src/**/*.module.ts', // Exclude module files from test coverage
    '!src/**/*.interface.ts', // Exclude interface files from test coverage
    '!src/**/index.ts', // Exclude barrel files from test coverage
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
