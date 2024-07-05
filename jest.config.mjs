/**
 * @type {import("jest").Config}
 */
const config = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts", "!**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageReporters: ["lcov"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleNameMapper: {
    [/^@$/u.source]: "<rootDir>/src",
    [/^@\/(.+)/u.source]: "<rootDir>/src/$1"
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended/all"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**"]
};

export default config;
