/* eslint-disable @skylib/config/eslintrc/no-disable -- Ok */

const { eslint } = require("@skylib/config/api");

const consistentImport = eslint.rules["@skylib/consistent-import"];

const prefixes = {
  createRule:
    "CallExpression[callee.object.name=utils][callee.property.name=createRule]",
  createWrapRule:
    "CallExpression[callee.object.name=utils][callee.property.name=/^(?:createRule|wrapRule)$/u]",
  testRule:
    "CallExpression[callee.object.name=utils][callee.property.name=testRule]",
  wrapRule:
    "CallExpression[callee.object.name=utils][callee.property.name=wrapRule]"
};

module.exports = {
  rules: {
    "@skylib/consistent-import": [
      "warn",
      {
        sources: [
          {
            _id: "rule-templates",
            autoImport: true,
            autoImportSource: "@/rule-templates",
            source: "@skylib/eslint-plugin/src/rule-templates",
            wildcard: true
          },
          {
            _id: "utils",
            autoImport: true,
            autoImportSource: "@/utils",
            source: "@skylib/eslint-plugin/src/utils",
            wildcard: true
          },
          {
            _id: "utils/configurable-selector",
            source: "@skylib/eslint-plugin/src/utils/configurable-selector",
            wildcard: true
          },
          {
            _id: "utils/types/TSESTree",
            localName: "TSESTree",
            source: "@skylib/eslint-plugin/src/utils/types/TSESTree",
            wildcard: true
          },
          ...consistentImport.sources
        ]
      }
    ],
    "@skylib/disallow-import/natural-compare": [
      "warn",
      { disallow: "natural-compare" }
    ],
    "@skylib/disallow-import/tsutils": ["warn", { disallow: "tsutils" }],
    "@skylib/disallow-import/typescript": ["warn", { disallow: "typescript" }],
    "@skylib/match-filename/createRule-id": [
      "warn",
      {
        format: "camelCase",
        selector:
          "VariableDeclarator[init.callee.object.name=utils][init.callee.property.name=createRule] > Identifier.id"
      }
    ],
    "@skylib/match-filename/createRule-name": [
      "warn",
      {
        format: "kebab-case",
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=name] > Literal.value`
      }
    ],
    "@skylib/match-filename/testRule-name": [
      "warn",
      { selector: `${prefixes.testRule} > Literal:first-child` }
    ],
    "@skylib/match-filename/testRule-rule": [
      "warn",
      {
        format: "kebab-case",
        selector:
          "VariableDeclarator[id.name=rule] > MemberExpression > Literal.property"
      }
    ],
    "@skylib/no-restricted-syntax/no-sentence-dot": [
      "warn",
      {
        message: "Remove dot at the end of sentence",
        selector: [
          `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=/^(optionDescriptions|optionTypes|suboptionDescriptions|suboptionTypes)$/u] > ObjectExpression > Property > Literal.value[value=/\\.$/u]`,
          `${prefixes.createRule} > ObjectExpression > Property[key.name=messages] > ObjectExpression > Property > Literal.value[value=/\\.$/u]`
        ]
      }
    ],
    "@skylib/no-restricted-syntax/no-skipped-tests": [
      "warn",
      {
        message: "No skipped tests",
        selector: `${prefixes.testRule} > ArrayExpression > ObjectExpression > Property > Identifier.key[name=only]`
      }
    ],
    "@skylib/no-restricted-syntax/require-sentence-dot": [
      "warn",
      {
        message: "Add dot at the end of sentence",
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=description] > Literal.value[value=/[^.]$/u]`
      }
    ],
    "@skylib/no-sibling-import": [
      "warn",
      {
        rules: [
          {
            filesToLint: ["./*"],
            hierarchy: [["./jest.config"], ["./jest.config.fast"]]
          },
          {
            filesToLint: ["./src/utils/*"],
            hierarchy: [
              ["./TypeCheck", "./compare", "./misc"],
              ["./create-rule", "./create-rule.internal", "./sort", "./test"]
            ]
          },
          {
            filesToLint: ["./src/utils/types/*"],
            hierarchy: [["./misc"], ["./context"]]
          }
        ]
      }
    ],
    "@skylib/require-syntax/no-unnecessary-typescript/no-restricted-syntax": [
      "warn",
      {
        message: 'Use "no-restricted-syntax" instead',
        selector: "[name=/^type[A-Z]/u]",
        trigger: 'Literal[value="typescript/no-restricted-syntax"]'
      }
    ],
    "@skylib/require-syntax/require-docs": [
      "warn",
      {
        message: 'Add "docs" option',
        selector: `${prefixes.createWrapRule} > ObjectExpression > Property > Identifier[name=docs]`,
        trigger: prefixes.createWrapRule
      }
    ],
    "@skylib/require-syntax/require-fix": [
      "warn",
      {
        message: 'Add "fix" option or "utils.sort"',
        selector:
          "Identifier[name=fix], MemberExpression[object.name=utils][property.name=sort]",
        trigger: `${prefixes.createRule} > ObjectExpression > Property > Identifier[name=fixable]`
      }
    ],
    "@skylib/require-syntax/require-isOptions": [
      "warn",
      {
        message: 'Add "isOptions" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=isOptions]`,
        trigger: [
          `${prefixes.createRule} > ObjectExpression > Property[key.name=defaultOptions]`,
          `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=optionDescriptions]`,
          `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=optionTypes]`
        ]
      }
    ],
    "@skylib/require-syntax/require-isSuboptions": [
      "warn",
      {
        message: 'Add "isSuboptions" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=isSuboptions]`,
        trigger: [
          `${prefixes.createRule} > ObjectExpression > Property[key.name=defaultSuboptions]`,
          `${prefixes.createRule} > ObjectExpression > Property[key.name=suboptionsKey]`,
          `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=suboptionDescriptions]`,
          `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=suboptionTypes]`
        ]
      }
    ],
    "@skylib/require-syntax/require-optionDescriptions": [
      "warn",
      {
        message: 'Add "optionDescriptions" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=optionDescriptions]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=isOptions]`
      }
    ],
    "@skylib/require-syntax/require-optionTypes": [
      "warn",
      {
        message: 'Add "optionTypes" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=optionTypes]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=isOptions]`
      }
    ],
    "@skylib/require-syntax/require-suboptionDescriptions": [
      "warn",
      {
        message: 'Add "suboptionDescriptions" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=suboptionDescriptions]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=isSuboptions]`
      }
    ],
    "@skylib/require-syntax/require-suboptionTypes": [
      "warn",
      {
        message: 'Add "suboptionTypes" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=suboptionTypes]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=isSuboptions]`
      }
    ],
    "@skylib/require-syntax/require-suboptionsKey": [
      "warn",
      {
        message: 'Add "suboptionsKey" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=suboptionsKey]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=isSuboptions]`
      }
    ],
    "@skylib/require-syntax/require-vue-false": [
      "warn",
      {
        message: 'Prefer "vue: false" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=create] > ArrowFunctionExpression[params.length<=1]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=vue][value.value=true]`
      }
    ],
    "@skylib/require-syntax/require-vue-true": [
      "warn",
      {
        message: 'Prefer "vue: true" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=create] > ArrowFunctionExpression[params.length>=2]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=vue][value.value=false]`
      }
    ]
  },
  overrides: [
    { files: "./fixtures/**", rules: { "@skylib/consistent-filename": "off" } },
    {
      files: "./src/**",
      rules: {
        "@skylib/no-relative-parent-import": [
          "warn",
          {
            allow: [
              "../../../misc",
              "../../../rule-templates",
              "../../../typescript",
              "../../../utils",
              "../../misc",
              "../../rule-templates",
              "../../typescript",
              "../../utils",
              "../misc",
              "../rule-templates",
              "../typescript",
              "../utils"
            ]
          }
        ],
        "@skylib/sort-keys": [
          "warn",
          {
            overrides: [
              {
                _id: "utils.createRule",
                customOrder: [
                  "name",
                  "fixable",
                  "vue",
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
      files: "./src/{misc,typescript,vue}/core/*",
      rules: {
        "@skylib/export-matching-filename-only": "off",
        "@skylib/sort-statements": [
          "warn",
          {
            programOrder: [
              "ImportDeclaration",
              "ExportAllDeclaration",
              "ExportDeclaration",
              "ExportDefaultDeclaration",
              "ExportTypeDeclaration",
              "ExportFunctionDeclaration",
              "ExportUnknown",
              "Unknown",
              "TypeDeclaration",
              "FunctionDeclaration",
              "JestTest"
            ]
          }
        ]
      }
    },
    {
      files: "./src/dev/typescript.d.ts",
      rules: {
        "@skylib/disallow-import/tsutils": "off",
        "@skylib/disallow-import/typescript": "off"
      }
    },
    {
      files: "./src/skylib-*/**",
      rules: {
        "@skylib/no-restricted-syntax/no-unnecessary-docs": [
          "warn",
          {
            message: 'Remove "docs" option',
            selector: `${prefixes.createWrapRule} > ObjectExpression > Property > Identifier[name=docs]`
          }
        ],
        "@skylib/require-syntax/require-docs": "off"
      }
    },
    {
      files: "./src/utils/TypeCheck.*",
      rules: {
        "@skylib/disallow-import/tsutils": "off",
        "@skylib/disallow-import/typescript": "off"
      }
    },
    {
      files: "./src/utils/compare.ts",
      rules: { "@skylib/disallow-import/natural-compare": "off" }
    },
    {
      files: "./tests/**",
      rules: {
        "@skylib/no-restricted-syntax/no-ast": [
          "warn",
          {
            message: "Prefer string literal",
            selector: "Identifier[name=AST_NODE_TYPES]"
          }
        ],
        "@skylib/sort-keys": [
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
    },
    {
      files: "./tests/eslintrc/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "eslintrc/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/jest/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "jest/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-config/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "config/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-config/eslintrc/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "config/eslintrc/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-facades/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "facades/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/jest/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/jest/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/array/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/array/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/converters/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/converters/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/guards/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/guards/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/json/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/json/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/object/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/object/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/program-flow/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/program-flow/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/reflect/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/reflect/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/types/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/types/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-quasar-extension/extras/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "quasar-extension/extras/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-quasar-extension/jest/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "quasar-extension/jest/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-quasar-extension/misc/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "quasar-extension/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-quasar-extension/vue/script/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "quasar-extension/vue/script/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-quasar-extension/vue/template/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "quasar-extension/vue/template/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/typescript/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "typescript/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/vue/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "vue/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    }
  ]
};
