export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.css$': 'jest-css-modules-transform',
  },
  transformIgnorePatterns: [
    "node_modules/*"
  ]
};