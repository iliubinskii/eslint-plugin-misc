# ESLint plugin

[![Stars](https://img.shields.io/github/stars/ilyub/eslint-plugin-misc)](https://github.com/ilyub/eslint-plugin-misc)
[![Downloads](https://img.shields.io/npm/dm/eslint-plugin-misc)](https://www.npmjs.com/package/eslint-plugin-misc)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/eslint-plugin-misc)](https://snyk.io/advisor/npm-package/eslint-plugin-misc)
[![Dependencies](https://img.shields.io/librariesio/release/npm/eslint-plugin-misc)](https://libraries.io/npm/eslint-plugin-misc)
[![Coverage](https://img.shields.io/sonar/coverage/ilyub_eslint-plugin-misc.svg?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/component_measures?id=ilyub_eslint-plugin-misc&metric=coverage)

## Table of contents

- [Overview](#overview)
- [Installation](#installation)
- [Configs](#configs)
- [Rules](#rules)
- [Synonyms](#synonyms)
- [Custom checks](#custom-checks)
- [Planned rules](#planned-rules)
- [Related packages](#related-packages)

## [](#overview)Overview

A collection of ESLint rules for:

- JavaScript / TypeScript files
- Jest test files
- Vue single-file components (using vue-eslint-parser)

## [](#installation)Installation

```sh
npm install --save-dev eslint-plugin-misc
```

```js
// .eslintrc.js
module.exports = {
  extends: "plugin:misc/all",
  parser: "@typescript-eslint/parser",
  plugins: ["misc"]
};
```

## [](#configs)Configs

- plugin:misc/all &mdash; All rules.
- plugin:misc/core &mdash; Core rules.
- plugin:misc/eslintrc &mdash; Rules for ESLint configuration files.
- plugin:misc/jest &mdash; Rules for Jest test files.
- plugin:misc/typescript &mdash; Rules for typescript files.
- plugin:misc/vue &mdash; Rules for Vue single-file components.

## [](#rules)Rules

{{rules}}

## [](#synonyms)Synonyms

You can use the same rule several times by adding synonym:

```js
// .eslintrc.synonyms.js
module.exports = [
  "misc/wrap/class-methods-use-this",
  "misc/wrap/no-shadow"
];

// .eslintrc.js
module.exports = {
  rules: {
    // Same as ESLint core rule, but suppresses warnings for methods that have "this" parameter.
    "misc/wrap/class-methods-use-this": [
      "error",
      {
        plugin: "eslint",
        rule: "class-methods-use-this",
        skip: "FunctionExpression[params.0.name=this]"
      }
    ],
    // Same as typescript-eslint rule, but suppresses warnings for enums.
    "misc/wrap/no-shadow": [
      "error",
      {
        plugin: "@typescript-eslint/eslint-plugin",
        rule: "no-shadow",
        skip: "TSEnumDeclaration *"
      }
    ]
  }
};
```

## [](#custom-checks)Custom checks

Many custom checks can be created without writing full-fledged ESLint plugin.
Use the rules below to create custom checks or adapt existing third-party rules:

{{rules:custom}}

If you want to apply one rule several times (e.g. restrict several syntaxes), use rule synonyms.

## [](#planned-rules)Planned rules

- boolean-in-boolean-context &mdash; Require strict boolean type in boolean contexts like `x && y` or `!x`.
- consistent-import-as &mdash; Require that _y_ in `import { x as y }` statement is from allowed list.
- consistent-test-file-name &mdash; Require that test file name matches some source file name.
- no-re-export-mixing &mdash; Require that file contains either only re-export or only export of new items.
- escape-doc-comment-entities &mdash; Require that "\<" and "\>" symbols inside doc comments are properly escaped.
- no-duplicate-import &mdash; Forbid combining `import { x } from "source"` and `import { x as y } from "source"` in the same file.
- protected-rules &mdash; Do not allow to disable selected ESLint rules.
- sort-eslint-comments &mdash; Sort rules in eslint-disable comments.
- sort-switch-cases &mdash; Sort switch cases.
- spell-check &mdash; Spell check with international language support based on hunspell spell checker.
- vue/no-warning-comments &mdash; Forbide warning comments in `<template>` section (e.g. `<!-- todo -->`).

## [](#related-packages)Related packages

- [eslint-plugin-misc](https://www.npmjs.com/package/eslint-plugin-misc) &mdash; ESLint plugin.
- [quasar-extension](https://www.npmjs.com/package/quasar-extension) &mdash; Quasar extension.
- [real-fns](https://www.npmjs.com/package/real-fns) &mdash; A collection of utility functions.
- [real-classes](https://www.npmjs.com/package/real-classes) &mdash; A collection of utility classes.
- [real-facades](https://www.npmjs.com/package/real-facades) &mdash; Facades (each facade provides interface to pluggable implementation).
- [real-service-providers](https://www.npmjs.com/package/real-service-providers) &mdash; Facade implementations.
