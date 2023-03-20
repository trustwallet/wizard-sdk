/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/test/.*\\.(test|spec)?\\.(ts)$",
  moduleFileExtensions: ["ts", "js", "json"],
};
