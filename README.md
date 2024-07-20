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

- [class-match-filename](https://iliubinskii.github.io/eslint-plugin-misc/class-match-filename.html) &mdash; Requires class name to match filename.
- [comment-spacing](https://iliubinskii.github.io/eslint-plugin-misc/comment-spacing.html) &mdash; Requires consistent empty lines around comments.
- [consistent-empty-lines](https://iliubinskii.github.io/eslint-plugin-misc/consistent-empty-lines.html) &mdash; Requires consistent empty lines.
- [consistent-enum-members](https://iliubinskii.github.io/eslint-plugin-misc/consistent-enum-members.html) &mdash; Requires consistent key-value pairs inside enums (key should match value).
- [consistent-filename](https://iliubinskii.github.io/eslint-plugin-misc/consistent-filename.html) &mdash; Enforces consistent file name format.
- [consistent-import](https://iliubinskii.github.io/eslint-plugin-misc/consistent-import.html) &mdash; Requires consistent import.
- [consistent-optional-props](https://iliubinskii.github.io/eslint-plugin-misc/consistent-optional-props.html) &mdash; Ensures consistent optional property style.
- [consistent-source-extension](https://iliubinskii.github.io/eslint-plugin-misc/consistent-source-extension.html) &mdash; Requires consistent import/export source extension.
- [consistent-symbol-description](https://iliubinskii.github.io/eslint-plugin-misc/consistent-symbol-description.html) &mdash; Requires consistent symbol description.
- [disallow-import](https://iliubinskii.github.io/eslint-plugin-misc/disallow-import.html) &mdash; Disallows import given sources.
- [export-matching-filename-only](https://iliubinskii.github.io/eslint-plugin-misc/export-matching-filename-only.html) &mdash; Requires that export matching filename is the only export.
- [match-filename](https://iliubinskii.github.io/eslint-plugin-misc/match-filename.html) &mdash; Requires that AST element matches filename.
- [max-identifier-blocks](https://iliubinskii.github.io/eslint-plugin-misc/max-identifier-blocks.html) &mdash; Restricts identifier complexity.
- [no-at-sign-import](https://iliubinskii.github.io/eslint-plugin-misc/no-at-sign-import.html) &mdash; Disallows "@" import.
- [no-at-sign-internal-import](https://iliubinskii.github.io/eslint-plugin-misc/no-at-sign-internal-import.html) &mdash; Disallows "@/**" import.
- [no-chain-coalescence-mixture](https://iliubinskii.github.io/eslint-plugin-misc/no-chain-coalescence-mixture.html) &mdash; Disallows mixing of chain and coalescence operators.
- [no-expression-empty-lines](https://iliubinskii.github.io/eslint-plugin-misc/no-expression-empty-lines.html) &mdash; Disallows empty lines inside expressions.
- [no-index-import](https://iliubinskii.github.io/eslint-plugin-misc/no-index-import.html) &mdash; Disallows "." import.
- [no-internal-modules](https://iliubinskii.github.io/eslint-plugin-misc/no-internal-modules.html) &mdash; Disallows importing of internal modules.
- [no-language-mixing](https://iliubinskii.github.io/eslint-plugin-misc/no-language-mixing.html) &mdash; Disallows language mixing.
- [no-negated-conditions](https://iliubinskii.github.io/eslint-plugin-misc/no-negated-conditions.html) &mdash; Disallows negated conditions.
- [no-nodejs-modules](https://iliubinskii.github.io/eslint-plugin-misc/no-nodejs-modules.html) &mdash; Disallows importing NodeJS modules.
- [no-param-reassign](https://iliubinskii.github.io/eslint-plugin-misc/no-param-reassign.html) &mdash; This rule wraps "no-param-reassign" core rule, but allows to edit params at the top of function body.
- [no-relative-parent-import](https://iliubinskii.github.io/eslint-plugin-misc/no-relative-parent-import.html) &mdash; Disallows relative parent import.
- [no-restricted-syntax](https://iliubinskii.github.io/eslint-plugin-misc/no-restricted-syntax.html) &mdash; Disallows AST syntax (an extended version of ESLint core rule).
- [no-self-import](https://iliubinskii.github.io/eslint-plugin-misc/no-self-import.html) &mdash; Disallows self-import.
- [no-shadow](https://iliubinskii.github.io/eslint-plugin-misc/no-shadow.html) &mdash; This rule wraps "@typescript-eslint/no-shadow" rule, but skips checking enum.
- [no-sibling-import](https://iliubinskii.github.io/eslint-plugin-misc/no-sibling-import.html) &mdash; Restricts importing siblings.
- [no-underscore-export](https://iliubinskii.github.io/eslint-plugin-misc/no-underscore-export.html) &mdash; Disallows underscore export.
- [no-unnecessary-as-const](https://iliubinskii.github.io/eslint-plugin-misc/no-unnecessary-as-const.html) &mdash; Disallows unnecessary "as const".
- [no-unnecessary-break](https://iliubinskii.github.io/eslint-plugin-misc/no-unnecessary-break.html) &mdash; Disallows unnecessary "break".
- [no-unnecessary-initialization](https://iliubinskii.github.io/eslint-plugin-misc/no-unnecessary-initialization.html) &mdash; Disallows unnecessary initialization.
- [no-unnecessary-template-literal](https://iliubinskii.github.io/eslint-plugin-misc/no-unnecessary-template-literal.html) &mdash; Disallows unnecessary template literals.
- [object-format](https://iliubinskii.github.io/eslint-plugin-misc/object-format.html) &mdash; Requires multiline or single-line object format.
- [only-export-name](https://iliubinskii.github.io/eslint-plugin-misc/only-export-name.html) &mdash; Requires that only export matches filename.
- [prefer-arrow-function-property](https://iliubinskii.github.io/eslint-plugin-misc/prefer-arrow-function-property.html) &mdash; Requires use of arrow functions.
- [prefer-const-require](https://iliubinskii.github.io/eslint-plugin-misc/prefer-const-require.html) &mdash; Requires "require()" to be assigned to variable.
- [prefer-only-export](https://iliubinskii.github.io/eslint-plugin-misc/prefer-only-export.html) &mdash; Requires only export if given AST element is found.
- [require-jsdoc](https://iliubinskii.github.io/eslint-plugin-misc/require-jsdoc.html) &mdash; Requires JSDoc documentation.
- [require-syntax](https://iliubinskii.github.io/eslint-plugin-misc/require-syntax.html) &mdash; Requires AST syntax.
- [restrict-identifier-characters](https://iliubinskii.github.io/eslint-plugin-misc/restrict-identifier-characters.html) &mdash; Requires that identifier consists only of english characters and dollar sign.
- [sort-array](https://iliubinskii.github.io/eslint-plugin-misc/sort-array.html) &mdash; Sorts arrays.
- [sort-call-signature](https://iliubinskii.github.io/eslint-plugin-misc/sort-call-signature.html) &mdash; Requires call signature to be first child.
- [sort-class-members](https://iliubinskii.github.io/eslint-plugin-misc/sort-class-members.html) &mdash; Sorts class members by type and alphabetically inside each type group.
- [sort-construct-signature](https://iliubinskii.github.io/eslint-plugin-misc/sort-construct-signature.html) &mdash; Requires construct signature to be first child.
- [sort-export-specifiers](https://iliubinskii.github.io/eslint-plugin-misc/sort-export-specifiers.html) &mdash; Sorts export specifiers.
- [sort-keys](https://iliubinskii.github.io/eslint-plugin-misc/sort-keys.html) &mdash; Sorts object keys.
- [sort-top-comments](https://iliubinskii.github.io/eslint-plugin-misc/sort-top-comments.html) &mdash; Sorts top comments.
- [switch-case-spacing](https://iliubinskii.github.io/eslint-plugin-misc/switch-case-spacing.html) &mdash; Ensures consistent empty lines between switch case statements.
- [template-literal-format](https://iliubinskii.github.io/eslint-plugin-misc/template-literal-format.html) &mdash; Requires consistent padding in template literals.
- [wrap](https://iliubinskii.github.io/eslint-plugin-misc/wrap.html) &mdash; Wraps and modifies third-party rule.
- [typescript/array-callback-return-type](https://iliubinskii.github.io/eslint-plugin-misc/typescript/array-callback-return-type.html) &mdash; Requires boolean return type in array callbacks.
- [typescript/class-methods-use-this](https://iliubinskii.github.io/eslint-plugin-misc/typescript/class-methods-use-this.html) &mdash; This rule wraps "class-methods-use-this" core rule, but skips methods with "this: void" argument.
- [typescript/consistent-array-type-name](https://iliubinskii.github.io/eslint-plugin-misc/typescript/consistent-array-type-name.html) &mdash; Requires consistent array type name.
- [typescript/define-function-in-one-statement](https://iliubinskii.github.io/eslint-plugin-misc/typescript/define-function-in-one-statement.html) &mdash; Requires that function is defined in one statement.
- [typescript/exhaustive-switch](https://iliubinskii.github.io/eslint-plugin-misc/typescript/exhaustive-switch.html) &mdash; Checks exhaustiveness of switch statement.
- [typescript/no-boolean-literal-type](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-boolean-literal-type.html) &mdash; Disallows boolean literal type.
- [typescript/no-complex-declarator-type](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-complex-declarator-type.html) &mdash; Requires either 'as const' or type definition complex declarators.
- [typescript/no-complex-return-type](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-complex-return-type.html) &mdash; Disallow complex function return types.
- [typescript/no-empty-interfaces](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-empty-interfaces.html) &mdash; Disallow empty interfaces.
- [typescript/no-inferrable-types](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-inferrable-types.html) &mdash; Reports inferrable types.
- [typescript/no-multi-type-tuples](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-multi-type-tuples.html) &mdash; Disallows multi-type tuples.
- [typescript/no-never](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-never.html) &mdash; Disallow "never" type.
- [typescript/no-restricted-syntax](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-restricted-syntax.html) &mdash; Disallows AST syntax with additional type check.
- [typescript/no-unsafe-object-assign](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-unsafe-object-assign.html) &mdash; Disallows unsafe "Object.assign".
- [typescript/no-unsafe-object-assignment](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-unsafe-object-assignment.html) &mdash; Reports unsafe object assignments.
- [typescript/prefer-array-type-alias](https://iliubinskii.github.io/eslint-plugin-misc/typescript/prefer-array-type-alias.html) &mdash; Prefer alias for array type.
- [typescript/prefer-class-method](https://iliubinskii.github.io/eslint-plugin-misc/typescript/prefer-class-method.html) &mdash; Requires use of class methods instead of function properties.
- [typescript/prefer-enum](https://iliubinskii.github.io/eslint-plugin-misc/typescript/prefer-enum.html) &mdash; Requires using enums instead of string literals.
- [typescript/prefer-readonly-array](https://iliubinskii.github.io/eslint-plugin-misc/typescript/prefer-readonly-array.html) &mdash; Disallows writable arrays.
- [typescript/prefer-readonly-map](https://iliubinskii.github.io/eslint-plugin-misc/typescript/prefer-readonly-map.html) &mdash; Disallows writable maps.
- [typescript/prefer-readonly-property](https://iliubinskii.github.io/eslint-plugin-misc/typescript/prefer-readonly-property.html) &mdash; Disallows writable properties.
- [typescript/prefer-readonly-set](https://iliubinskii.github.io/eslint-plugin-misc/typescript/prefer-readonly-set.html) &mdash; Disallows writable sets.
- [typescript/require-prop-type-annotation](https://iliubinskii.github.io/eslint-plugin-misc/typescript/require-prop-type-annotation.html) &mdash; Requires type annotation for class properties.
- [typescript/require-this-void](https://iliubinskii.github.io/eslint-plugin-misc/typescript/require-this-void.html) &mdash; Requires "this: void" for static methods.

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

- [no-restricted-syntax](https://iliubinskii.github.io/eslint-plugin-misc/no-restricted-syntax.html) &mdash; Disallows AST syntax (an extended version of ESLint core rule).
- [require-syntax](https://iliubinskii.github.io/eslint-plugin-misc/require-syntax.html) &mdash; Requires AST syntax.
- [wrap](https://iliubinskii.github.io/eslint-plugin-misc/wrap.html) &mdash; Wraps and modifies third-party rule.
- [typescript/no-restricted-syntax](https://iliubinskii.github.io/eslint-plugin-misc/typescript/no-restricted-syntax.html) &mdash; Disallows AST syntax with additional type check.

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
