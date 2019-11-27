module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/bin",
  ],
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/bin",
  ],
  coverageReporters: ["html"]
};