module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "**/app/javascript/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  setupFilesAfterEnv: ["./setup-tests.js"],
  testMatch: [ "**/__tests__/**/*.(spec|test).ts?(x)", "**/?(*.)+(spec|test).ts?(x)" ],
  moduleFileExtensions: [
    'js', 'jsx',
    "ts", 'tsx'
  ],
  unmockedModulePathPatterns: [
    "react"
  ],
  globals: {
    'ts-jest': {
      tsConfig: "tsconfig.test.json"
    }
  }
};