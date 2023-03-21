/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/test/.*\\.(test|spec)?\\.(ts)$",
  moduleFileExtensions: ["ts", "js", "json"],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 90,
    },
  },
};

// eslint-disable-next-line no-undef
module.exports = config;
