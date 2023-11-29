module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
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
