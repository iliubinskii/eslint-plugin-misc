/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  env: { es2022: true, jest: true },
  extends: ["./.eslintrc.base.cjs", "./.eslintrc.spellcheck.cjs"],
  globals: {},
  ignorePatterns: ["!.*", "coverage/**", "dist/**", "es/**", "node_modules/**"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2022,
    project: "tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "@typescript-eslint/no-namespace": "off",
    "i18n-text/no-en": "off",
    "import/no-internal-modules": [
      "warn",
      { allow: ["@typescript-eslint/utils/dist/ts-eslint"] }
    ],
    "import/no-namespace": "off",
    "jsdoc/require-jsdoc": "off",
    "no-magic-numbers": "off",
    "no-type-assertion/no-type-assertion": "off",
    "sonarjs/cognitive-complexity": "off",
    "sort/object-properties": "off"
  }
};

module.exports = config;