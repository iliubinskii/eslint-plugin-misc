# ESLint plugin with misc rules

[![Stars](https://img.shields.io/github/stars/ilyub/eslint-plugin-misc)](https://github.com/ilyub/eslint-plugin-misc)
[![Downloads](https://img.shields.io/npm/dm/eslint-plugin-misc)](https://www.npmjs.com/package/eslint-plugin-misc)
[![Coverage](https://img.shields.io/sonar/coverage/ilyub_eslint-plugin-misc.svg?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/component_measures?id=ilyub_eslint-plugin-misc&metric=coverage)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/eslint-plugin-misc)](https://snyk.io/advisor/npm-package/eslint-plugin-misc)
[![Dependencies](https://img.shields.io/librariesio/release/npm/eslint-plugin-misc)](https://libraries.io/npm/eslint-plugin-misc)

## Table of contents

- [Overview](#overview)
- [Installation](#installation)
- [ESLint configuration file](#eslint-configuration-file)
- [Configs](#configs)
- [Rules](#rules)
- [Synonyms](#synonyms)
- [Custom checks](#custom-checks)
- [Planned rules](#planned-rules)
- [Related packages](#related-packages)

## <a name="overview"></a>Overview

This plugin includes miscellaneous ESLint rules for:
- Javascript files
- Typescript files
- Jest test files
- Vue single-file components

## <a name="installation"></a>Installation

```
npm install --save-dev eslint-plugin-misc
```

## <a name="eslint-configuration-file"></a>ESLint configuration file

```js
// .eslintrc.js
module.exports = {
  extends: "plugin:misc/all",
  parser: "@typescript-eslint/parser",
  plugins: ["misc"]
};
```

## <a name="configs"></a>Configs

- plugin:misc/all &mdash; All rules.
- plugin:misc/core &mdash; Core rules.
- plugin:misc/eslintrc &mdash; Rules for ESLint configuration files.
- plugin:misc/jest &mdash; Rules for Jest test files.
- plugin:misc/typescript &mdash; Rules for typescript files.
- plugin:misc/vue &mdash; Rules for Vue single-file components.

## <a name="rules"></a>Rules

{{rules}}

## <a name="synonyms"></a>Synonyms

You can create rule synonyms like this:
```js
// .eslintrc.synonyms.js
module.exports = [
  "misc/wrap/class-methods-use-this",
  "misc/wrap/no-shadow"
];

// .eslintrc.js
module.exports = {
  rules: {
    // Same as ESLint core rule, but suppresses warnings for methods that have "this: void" annotation.
    "misc/wrap/class-methods-use-this": [
      "error",
      {
        plugin: "eslint",
        rule: "class-methods-use-this",
        skip: "FunctionExpression[params.0.name=this][params.0.typeAnnotation.typeAnnotation.type=TSVoidKeyword]"
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

## <a name="custom-checks"></a>Custom checks

You can use the following rules to create custom checks:
{{rules:custom-checks}}

If you want to apply one rule several times (e.g. restrict several syntaxes), use rule synonyms.

## <a name="planned-rules"></a>Planned rules

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

## <a name="related-packages"></a>Related packages

- [eslint-plugin-misc](https://www.npmjs.com/package/eslint-plugin-misc) &mdash; ESLint plugin.
- [quasar-extension](https://www.npmjs.com/package/quasar-extension) &mdash; Quasar extension.
- [real-fns](https://www.npmjs.com/package/real-fns) &mdash; A collection of utility functions.
- [real-classes](https://www.npmjs.com/package/real-classes) &mdash; A collection of utility classes.
- [real-facades](https://www.npmjs.com/package/real-facades) &mdash; Facades (each facade provides interface to pluggable implementation).
- [real-framework](https://www.npmjs.com/package/real-framework) &mdash; Facade implementations.
