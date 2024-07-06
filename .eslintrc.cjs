const prefixes = {
  createRule:
    "CallExpression[callee.object.name=utils][callee.property.name=createRule]",
  testRule:
    "CallExpression[callee.object.name=utils][callee.property.name=testRule]",
  wrapRule:
    "CallExpression[callee.object.name=utils][callee.property.name=wrapRule]"
};

/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  ignorePatterns: ["!.*", "coverage/**", "dist/**", "es/**", "node_modules/**"],
  env: { es2022: true, jest: true },
  globals: {},
  extends: ["./.eslintrc.base.cjs", "./.eslintrc.spellcheck.cjs"],
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
    "sonarjs/cognitive-complexity": "off"
  },
  overrides: [
    {
      files: "./src/**",
      rules: {
        "misc/sort-keys": [
          "warn",
          {
            overrides: [
              {
                _id: "utils.createRule",
                customOrder: [
                  "name",
                  "fixable",
                  "hasSuggestions",
                  "isOptions",
                  "defaultOptions",
                  "isSuboptions",
                  "defaultSuboptions",
                  "suboptionsKey",
                  "messages",
                  "docs",
                  "create"
                ],
                selector: `${prefixes.createRule} > ObjectExpression`
              },
              {
                _id: "utils.createRule.docs",
                customOrder: [
                  "description",
                  "optionTypes",
                  "optionDescriptions",
                  "suboptionTypes",
                  "suboptionDescriptions",
                  "failExamples",
                  "passExamples"
                ],
                selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression`
              },
              {
                _id: "utils.wrapRule",
                customOrder: ["rule", "options", "docs"],
                selector: `${prefixes.wrapRule} > ObjectExpression`
              }
            ]
          }
        ]
      }
    },
    {
      files: "./tests/**",
      rules: {
        "misc/sort-keys": [
          "warn",
          {
            overrides: [
              {
                _id: "testRule",
                customOrder: [
                  "only",
                  "name",
                  "filename",
                  "settings",
                  "options",
                  "code",
                  "output",
                  "errors"
                ],
                selector: `${prefixes.testRule} > ArrayExpression > ObjectExpression`
              },
              {
                _id: "testRule.errors",
                customOrder: ["line", "endLine", "messageId"],
                selector: `${prefixes.testRule} > ArrayExpression > ObjectExpression > Property[key.name=errors] > ArrayExpression > ObjectExpression`
              }
            ]
          }
        ]
      }
    }
  ]
};

module.exports = config;
