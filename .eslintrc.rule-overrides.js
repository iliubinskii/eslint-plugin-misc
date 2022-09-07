/* eslint-disable misc/real-config/eslintrc/no-disable -- Ok */

const { eslint } = require("real-config/api");

const consistentImport = eslint.rules["misc/consistent-import"];

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
    "misc/consistent-import": [
      "warn",
      {
        sources: [
          // eslint-disable-next-line no-warning-comments -- Wait for real-config update
          // fixme
          {
            _id: "lodash-commonjs-es",
            autoImport: true,
            localName: "_",
            source: "lodash-commonjs-es",
            wildcard: true
          },
          {
            _id: "rule-templates",
            autoImport: true,
            autoImportSource: "@/rule-templates",
            source: "eslint-plugin-misc/src/rule-templates",
            wildcard: true
          },
          {
            _id: "utils",
            autoImport: true,
            autoImportSource: "@/utils",
            source: "eslint-plugin-misc/src/utils",
            wildcard: true
          },
          {
            _id: "utils/configurable-selector",
            source: "eslint-plugin-misc/src/utils/configurable-selector",
            wildcard: true
          },
          {
            _id: "utils/types/TSESTree",
            localName: "TSESTree",
            source: "eslint-plugin-misc/src/utils/types/TSESTree",
            wildcard: true
          },
          ...consistentImport.sources
        ]
      }
    ],
    "misc/disallow-import/natural-compare": [
      "warn",
      { disallow: "natural-compare" }
    ],
    "misc/disallow-import/tsutils": ["warn", { disallow: "tsutils" }],
    "misc/disallow-import/typescript": ["warn", { disallow: "typescript" }],
    "misc/match-filename/createRule-id": [
      "warn",
      {
        format: "camelCase",
        selector:
          "VariableDeclarator[init.callee.object.name=utils][init.callee.property.name=createRule] > Identifier.id"
      }
    ],
    "misc/match-filename/createRule-name": [
      "warn",
      {
        format: "kebab-case",
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=name] > Literal.value`
      }
    ],
    "misc/match-filename/testRule-name": [
      "warn",
      { selector: `${prefixes.testRule} > Literal:first-child` }
    ],
    "misc/match-filename/testRule-rule": [
      "warn",
      {
        format: "kebab-case",
        selector:
          "VariableDeclarator[id.name=rule] > MemberExpression > Literal.property"
      }
    ],
    "misc/no-restricted-syntax/no-sentence-dot": [
      "warn",
      {
        message: "Remove dot at the end of sentence",
        selector: [
          `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=/^(optionDescriptions|optionTypes|suboptionDescriptions|suboptionTypes)$/u] > ObjectExpression > Property > Literal.value[value=/\\.$/u]`,
          `${prefixes.createRule} > ObjectExpression > Property[key.name=messages] > ObjectExpression > Property > Literal.value[value=/\\.$/u]`
        ]
      }
    ],
    "misc/no-restricted-syntax/no-skipped-tests": [
      "warn",
      {
        message: "No skipped tests",
        selector: `${prefixes.testRule} > ArrayExpression > ObjectExpression > Property > Identifier.key[name=only]`
      }
    ],
    "misc/no-restricted-syntax/require-sentence-dot": [
      "warn",
      {
        message: "Add dot at the end of sentence",
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=description] > Literal.value[value=/[^.]$/u]`
      }
    ],
    "misc/no-sibling-import": [
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
    "misc/require-syntax/no-unnecessary-typescript/no-restricted-syntax": [
      "warn",
      {
        message: 'Use "no-restricted-syntax" instead',
        selector: "[name=/^type[A-Z]/u]",
        trigger: 'Literal[value="typescript/no-restricted-syntax"]'
      }
    ],
    "misc/require-syntax/require-docs": [
      "warn",
      {
        message: 'Add "docs" option',
        selector: `${prefixes.createWrapRule} > ObjectExpression > Property > Identifier[name=docs]`,
        trigger: prefixes.createWrapRule
      }
    ],
    "misc/require-syntax/require-fix": [
      "warn",
      {
        message: 'Add "fix" option or "utils.sort"',
        selector:
          "Identifier[name=fix], MemberExpression[object.name=utils][property.name=sort]",
        trigger: `${prefixes.createRule} > ObjectExpression > Property > Identifier[name=fixable]`
      }
    ],
    "misc/require-syntax/require-isOptions": [
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
    "misc/require-syntax/require-isSuboptions": [
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
    "misc/require-syntax/require-optionDescriptions": [
      "warn",
      {
        message: 'Add "optionDescriptions" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=optionDescriptions]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=isOptions]`
      }
    ],
    "misc/require-syntax/require-optionTypes": [
      "warn",
      {
        message: 'Add "optionTypes" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=optionTypes]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=isOptions]`
      }
    ],
    "misc/require-syntax/require-suboptionDescriptions": [
      "warn",
      {
        message: 'Add "suboptionDescriptions" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=suboptionDescriptions]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=isSuboptions]`
      }
    ],
    "misc/require-syntax/require-suboptionTypes": [
      "warn",
      {
        message: 'Add "suboptionTypes" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=docs] > ObjectExpression > Property[key.name=suboptionTypes]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=isSuboptions]`
      }
    ],
    "misc/require-syntax/require-suboptionsKey": [
      "warn",
      {
        message: 'Add "suboptionsKey" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=suboptionsKey]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=isSuboptions]`
      }
    ],
    "misc/require-syntax/require-vue-false": [
      "warn",
      {
        message: 'Prefer "vue: false" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=create] > ArrowFunctionExpression[params.length<=1]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=vue][value.value=true]`
      }
    ],
    "misc/require-syntax/require-vue-true": [
      "warn",
      {
        message: 'Prefer "vue: true" option',
        selector: `${prefixes.createRule} > ObjectExpression > Property[key.name=create] > ArrowFunctionExpression[params.length>=2]`,
        trigger: `${prefixes.createRule} > ObjectExpression > Property[key.name=vue][value.value=false]`
      }
    ]
  },
  overrides: [
    { files: "./fixtures/**", rules: { "misc/consistent-filename": "off" } },
    {
      files: "./src/**",
      rules: {
        "misc/no-relative-parent-import": [
          "warn",
          {
            allow: [
              "../../../core",
              "../../../rule-templates",
              "../../../typescript",
              "../../../utils",
              "../../core",
              "../../rule-templates",
              "../../typescript",
              "../../utils",
              "../core",
              "../rule-templates",
              "../typescript",
              "../utils"
            ]
          }
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
      files: "./src/{core,typescript,vue}/base/*",
      rules: {
        "misc/export-matching-filename-only": "off",
        "misc/sort-statements": [
          "warn",
          {
            programOrder: [
              "ImportDeclaration",
              "DeclareGlobal",
              "ExportAllDeclaration",
              "ExportDeclaration",
              "ExportDefaultDeclaration",
              "ExportTypeDeclaration",
              "ExportFunctionDeclaration",
              "ExportUnknown",
              "Unknown",
              "FunctionDeclaration",
              "TypeDeclaration",
              "JestTest"
            ]
          }
        ]
      }
    },
    {
      files: "./src/dev/typescript.d.ts",
      rules: {
        "misc/disallow-import/tsutils": "off",
        "misc/disallow-import/typescript": "off"
      }
    },
    {
      files:
        "./src/{quasar-extension,real-config,real-facades,real-fns,real-framework}/**",
      rules: {
        "misc/no-restricted-syntax/no-unnecessary-docs": [
          "warn",
          {
            message: 'Remove "docs" option',
            selector: `${prefixes.createWrapRule} > ObjectExpression > Property > Identifier[name=docs]`
          }
        ],
        "misc/require-syntax/require-docs": "off"
      }
    },
    {
      files: "./src/utils/TypeCheck.*",
      rules: {
        "misc/disallow-import/tsutils": "off",
        "misc/disallow-import/typescript": "off"
      }
    },
    {
      files: "./src/utils/compare.ts",
      rules: { "misc/disallow-import/natural-compare": "off" }
    },
    {
      files: "./tests/**",
      rules: {
        "misc/no-restricted-syntax/no-ast": [
          "warn",
          {
            message: "Prefer string literal",
            selector: "Identifier[name=AST_NODE_TYPES]"
          }
        ],
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
    },
    {
      files: "./tests/eslintrc/**",
      rules: {
        "misc/match-filename/testRule-rule": [
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
        "misc/match-filename/testRule-rule": [
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
      files: "./tests/real-config/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-config/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-config/eslintrc/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-config/eslintrc/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-facades/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-facades/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-fns/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-fns/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-fns/jest/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-fns/jest/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-fns/core/array/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-fns/array/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-fns/core/converters/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-fns/converters/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-fns/core/guards/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-fns/guards/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-fns/core/json/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-fns/json/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-fns/core/object/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-fns/object/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-fns/core/program-flow/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-fns/program-flow/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-fns/core/reflect/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-fns/reflect/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/real-fns/core/types/**",
      rules: {
        "misc/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "real-fns/types/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/quasar-extension/extras/**",
      rules: {
        "misc/match-filename/testRule-rule": [
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
      files: "./tests/quasar-extension/jest/**",
      rules: {
        "misc/match-filename/testRule-rule": [
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
      files: "./tests/quasar-extension/core/**",
      rules: {
        "misc/match-filename/testRule-rule": [
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
      files: "./tests/quasar-extension/vue/script/**",
      rules: {
        "misc/match-filename/testRule-rule": [
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
      files: "./tests/quasar-extension/vue/template/**",
      rules: {
        "misc/match-filename/testRule-rule": [
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
        "misc/match-filename/testRule-rule": [
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
        "misc/match-filename/testRule-rule": [
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
