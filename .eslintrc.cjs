/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  ignorePatterns: [
    "!.*",
    "/coverage/**",
    "/dist/**",
    "/es/**",
    "/node_modules/**"
  ],
  env: {
    es2022: true,
    jest: true
  },
  extends: "./.eslintrc.base.cjs",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2022,
    project: "tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "@cspell/spellchecker": [
      "warn",
      {
        cspell: {
          words:
            // @sorted
            [
              "csstools",
              "escompat",
              "inexhaustive",
              "quasis",
              "smacss",
              "sonarjs",
              "suboption",
              "suboptions",
              "tses"
            ]
        }
      }
    ],
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
        "misc/consistent-optional-props": [
          "warn",
          { classes: "optional", interfaces: "optional" }
        ],
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
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression"
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
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression > Property[key.name=docs] > ObjectExpression"
              },
              {
                _id: "utils.wrapRule",
                customOrder: ["rule", "options", "docs"],
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=wrapRule] > ObjectExpression"
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
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=testRule] > ArrayExpression > ObjectExpression"
              },
              {
                _id: "testRule.errors",
                customOrder: ["line", "endLine", "messageId"],
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=testRule] > ArrayExpression > ObjectExpression > Property[key.name=errors] > ArrayExpression > ObjectExpression"
              }
            ]
          }
        ]
      }
    }
  ]
};

module.exports = config;
