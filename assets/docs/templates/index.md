# ESLint plugin

## Table of contents

- [Overview](#overview)
- [Installation](#installation)
- [Configs](#configs)
- [Rules](#rules)
- [Synonyms](#synonyms)
- [Custom checks](#custom-checks)
- [Planned rules](#planned-rules)

## Overview

A collection of ESLint rules for JavaScript and TypeScript files.

## Installation

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

## Configs

- plugin:misc/all &mdash; All rules.
- plugin:misc/recommended &mdash; Recommended rules.
- plugin:misc/core &mdash; Core rules.
- plugin:misc/typescript &mdash; Rules for typescript files.

## Rules

%RULES%

## Synonyms

You can use the same rule several times by adding synonym:

```js
// .eslintrc.synonyms.cjs
module.exports = ["misc/wrap/class-methods-use-this", "misc/wrap/no-shadow"];

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

## Custom checks

Many custom checks can be created without writing full-fledged ESLint plugin.
Use the rules below to create custom checks or adapt existing third-party rules:

%CUSTOM-RULES%

If you want to apply one rule several times (e.g. restrict several syntaxes), use rule synonyms.

## Planned rules

- boolean-in-boolean-context &mdash; Require strict boolean type in boolean contexts like `x && y` or `!x`.
- consistent-import-as &mdash; Require that _y_ in `import { x as y }` statement is from allowed list.
- consistent-test-file-name &mdash; Require that test file name matches some source file name.
- no-re-export-mixing &mdash; Require that file contains either only re-export or only export of new items.
- escape-doc-comment-entities &mdash; Require that "\<" and "\>" symbols inside doc comments are properly escaped.
- no-array-mutation &mdash; Forbid array mutation.
- no-duplicate-import &mdash; Forbid combining `import { x } from "source"` and `import { x as y } from "source"` in the same file.
- protected-rules &mdash; Do not allow to disable selected ESLint rules.
- sort-eslint-comments &mdash; Sort rules in eslint-disable comments.
- sort-switch-cases &mdash; Sort switch cases.
- spell-check &mdash; Spell check with international language support based on hunspell spell checker.
