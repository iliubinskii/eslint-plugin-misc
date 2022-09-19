# ESLint plugin with misc rules

[![Stars](https://img.shields.io/github/stars/ilyub/eslint-plugin-misc)](https://github.com/ilyub/eslint-plugin-misc)
[![Downloads](https://img.shields.io/npm/dm/eslint-plugin-misc)](https://www.npmjs.com/package/eslint-plugin-misc)
[![Coverage](https://img.shields.io/sonar/coverage/ilyub_eslint-plugin-misc.svg?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/component_measures?id=ilyub_eslint-plugin-misc&metric=coverage)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/eslint-plugin-misc)](https://snyk.io/advisor/npm-package/eslint-plugin-misc)
[![Dependencies](https://img.shields.io/librariesio/release/npm/eslint-plugin-misc)](https://libraries.io/npm/eslint-plugin-misc)

## Table of contents

- [Overview](#overview)
- [Configs](#configs)
- [Rules](#rules)
- [Synonyms](#synonyms)
- [Custom checks](#custom-checks)
- [Rules under consideration](#rules-under-consideration)

## <a name="overview"></a>Overview

This plugin includes miscellaneous ESLint rules.

Installation:
```
npm install --save-dev eslint-plugin-misc
```

Configuring:
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

- [class-match-filename](https://ilyub.github.io/eslint-plugin-misc/class-match-filename.html) &mdash; Requires class name to match filename.
- [comment-spacing](https://ilyub.github.io/eslint-plugin-misc/comment-spacing.html) &mdash; Requires consistent empty lines around comments.
- [consistent-empty-lines](https://ilyub.github.io/eslint-plugin-misc/consistent-empty-lines.html) &mdash; Requires consistent empty lines.
- [consistent-enum-members](https://ilyub.github.io/eslint-plugin-misc/consistent-enum-members.html) &mdash; Requires consistent key-value pairs inside enums (key should match value).
- [consistent-filename](https://ilyub.github.io/eslint-plugin-misc/consistent-filename.html) &mdash; Enforces consistent file name format.
- [consistent-import](https://ilyub.github.io/eslint-plugin-misc/consistent-import.html) &mdash; Requires consistent import.
- [consistent-optional-props](https://ilyub.github.io/eslint-plugin-misc/consistent-optional-props.html) &mdash; Ensures consistent optional property style.
- [consistent-source-extension](https://ilyub.github.io/eslint-plugin-misc/consistent-source-extension.html) &mdash; Requires consistent import/export source extension.
- [consistent-symbol-description](https://ilyub.github.io/eslint-plugin-misc/consistent-symbol-description.html) &mdash; Requires consistent symbol description.
- [disallow-import](https://ilyub.github.io/eslint-plugin-misc/disallow-import.html) &mdash; Disallows import given sources.
- [export-matching-filename-only](https://ilyub.github.io/eslint-plugin-misc/export-matching-filename-only.html) &mdash; Requires that export matching filename is the only export.
- [match-filename](https://ilyub.github.io/eslint-plugin-misc/match-filename.html) &mdash; Requires that AST element matches filename.
- [max-identifier-blocks](https://ilyub.github.io/eslint-plugin-misc/max-identifier-blocks.html) &mdash; Restricts identifier complexity.
- [no-at-sign-import](https://ilyub.github.io/eslint-plugin-misc/no-at-sign-import.html) &mdash; Disallows "@" import.
- [no-at-sign-internal-import](https://ilyub.github.io/eslint-plugin-misc/no-at-sign-internal-import.html) &mdash; Disallows "@/**" import.
- [no-chain-coalescence-mixture](https://ilyub.github.io/eslint-plugin-misc/no-chain-coalescence-mixture.html) &mdash; Disallows mixing of chain and coalescence operators.
- [no-expression-empty-lines](https://ilyub.github.io/eslint-plugin-misc/no-expression-empty-lines.html) &mdash; Disallows empty lines inside expressions.
- [no-index-import](https://ilyub.github.io/eslint-plugin-misc/no-index-import.html) &mdash; Disallows "." import.
- [no-internal-modules](https://ilyub.github.io/eslint-plugin-misc/no-internal-modules.html) &mdash; Disallows importing of internal modules.
- [no-language-mixing](https://ilyub.github.io/eslint-plugin-misc/no-language-mixing.html) &mdash; Disallows langauge mixing.
- [no-negated-conditions](https://ilyub.github.io/eslint-plugin-misc/no-negated-conditions.html) &mdash; Disallows negated conditions.
- [no-nodejs-modules](https://ilyub.github.io/eslint-plugin-misc/no-nodejs-modules.html) &mdash; Disallows importing NodeJS modules.
- [no-param-reassign](https://ilyub.github.io/eslint-plugin-misc/no-param-reassign.html) &mdash; This rule wraps "no-param-reassign" core rule, but allows to edit params at the top of function body.
- [no-relative-parent-import](https://ilyub.github.io/eslint-plugin-misc/no-relative-parent-import.html) &mdash; Disallows relative parent import.
- [no-restricted-syntax](https://ilyub.github.io/eslint-plugin-misc/no-restricted-syntax.html) &mdash; Disallows AST syntax (an extended version of ESLint core rule).
- [no-self-import](https://ilyub.github.io/eslint-plugin-misc/no-self-import.html) &mdash; Disallows self-import.
- [no-shadow](https://ilyub.github.io/eslint-plugin-misc/no-shadow.html) &mdash; This rule wraps "@typescript-eslint/no-shadow" rule, but skips checking enum.
- [no-sibling-import](https://ilyub.github.io/eslint-plugin-misc/no-sibling-import.html) &mdash; Restricts importing siblings.
- [no-underscore-export](https://ilyub.github.io/eslint-plugin-misc/no-underscore-export.html) &mdash; Disallows underscore export.
- [no-unnecessary-as-const](https://ilyub.github.io/eslint-plugin-misc/no-unnecessary-as-const.html) &mdash; Disallows unnecessary "as const".
- [no-unnecessary-break](https://ilyub.github.io/eslint-plugin-misc/no-unnecessary-break.html) &mdash; Disallows unnecessary "break".
- [no-unnecessary-initialization](https://ilyub.github.io/eslint-plugin-misc/no-unnecessary-initialization.html) &mdash; Disallows unnecessary initialization.
- [no-unnecessary-template-literal](https://ilyub.github.io/eslint-plugin-misc/no-unnecessary-template-literal.html) &mdash; Disallows unnecessary template literals.
- [object-format](https://ilyub.github.io/eslint-plugin-misc/object-format.html) &mdash; Requires multiline or single-line object format.
- [only-export-name](https://ilyub.github.io/eslint-plugin-misc/only-export-name.html) &mdash; Requires that only export matches filename.
- [prefer-arrow-function-property](https://ilyub.github.io/eslint-plugin-misc/prefer-arrow-function-property.html) &mdash; Requires use of arrow functions.
- [prefer-const-require](https://ilyub.github.io/eslint-plugin-misc/prefer-const-require.html) &mdash; Requires "require()" to be assigned to variable.
- [prefer-only-export](https://ilyub.github.io/eslint-plugin-misc/prefer-only-export.html) &mdash; Requires only export if given AST element if found.
- [require-jsdoc](https://ilyub.github.io/eslint-plugin-misc/require-jsdoc.html) &mdash; Requires JSDoc documentation.
- [require-syntax](https://ilyub.github.io/eslint-plugin-misc/require-syntax.html) &mdash; Requires AST syntax.
- [restrict-identifier-characters](https://ilyub.github.io/eslint-plugin-misc/restrict-identifier-characters.html) &mdash; Requires "require()" to be assigned to variable.
- [sort-array](https://ilyub.github.io/eslint-plugin-misc/sort-array.html) &mdash; Sorts arrays.
- [sort-call-signature](https://ilyub.github.io/eslint-plugin-misc/sort-call-signature.html) &mdash; Requires call signature to be first child.
- [sort-class-members](https://ilyub.github.io/eslint-plugin-misc/sort-class-members.html) &mdash; Sorts class members by type and alphabetically inside each type group.
- [sort-construct-signature](https://ilyub.github.io/eslint-plugin-misc/sort-construct-signature.html) &mdash; Requires construct signature to be first child.
- [sort-keys](https://ilyub.github.io/eslint-plugin-misc/sort-keys.html) &mdash; Sorts object keys.
- [sort-statements](https://ilyub.github.io/eslint-plugin-misc/sort-statements.html) &mdash; Sorts statements.
- [sort-top-comments](https://ilyub.github.io/eslint-plugin-misc/sort-top-comments.html) &mdash; Sorts top comments.
- [switch-case-spacing](https://ilyub.github.io/eslint-plugin-misc/switch-case-spacing.html) &mdash; Ensures consistent empty lines between switch case statements.
- [template-literal-format](https://ilyub.github.io/eslint-plugin-misc/template-literal-format.html) &mdash; Requires consistent padding in template literals.
- [wrap](https://ilyub.github.io/eslint-plugin-misc/wrap.html) &mdash; Wraps and modifies third-party rule.
- [eslintrc/no-message-dot](https://ilyub.github.io/eslint-plugin-misc/eslintrc/no-message-dot.html) &mdash; Disallows dot at the end of message.
- [eslintrc/no-unnecessary-array](https://ilyub.github.io/eslint-plugin-misc/eslintrc/no-unnecessary-array.html) &mdash; Disallows unnessecary single-element arrays in eslint configuration files.
- [eslintrc/sort-array](https://ilyub.github.io/eslint-plugin-misc/eslintrc/sort-array.html) &mdash; Sorts safely sortable arrays in eslint configuration files.
- [eslintrc/sort-suboptions](https://ilyub.github.io/eslint-plugin-misc/eslintrc/sort-suboptions.html) &mdash; Sorts safely sortable arrays in eslint configuration files.
- [jest/no-toThrow-literal](https://ilyub.github.io/eslint-plugin-misc/jest/no-toThrow-literal.html) &mdash; Disallows string argument in "toThrow" matcher.
- [jest/prefer-toBe](https://ilyub.github.io/eslint-plugin-misc/jest/prefer-toBe.html) &mdash; Requires "toBe" matcher instead of "toStrictEqual" for primitive argument types.
- [jest/prefer-toStrictEqual](https://ilyub.github.io/eslint-plugin-misc/jest/prefer-toStrictEqual.html) &mdash; Requires "toStrictEqual" matcher instead of "toBe" for non-primitive argument types.
- [typescript/array-callback-return-type](https://ilyub.github.io/eslint-plugin-misc/typescript/array-callback-return-type.html) &mdash; Requires boolean return type in array callbacks.
- [typescript/class-methods-use-this](https://ilyub.github.io/eslint-plugin-misc/typescript/class-methods-use-this.html) &mdash; This rule wraps "class-methods-use-this" core rule, but skips methods with "this: void" argument.
- [typescript/consistent-array-type-name](https://ilyub.github.io/eslint-plugin-misc/typescript/consistent-array-type-name.html) &mdash; Requires consistent array type name.
- [typescript/define-function-in-one-statement](https://ilyub.github.io/eslint-plugin-misc/typescript/define-function-in-one-statement.html) &mdash; Requires that function is defined in one statement.
- [typescript/exhaustive-switch](https://ilyub.github.io/eslint-plugin-misc/typescript/exhaustive-switch.html) &mdash; Checks exhaustiveness of switch statement.
- [typescript/no-boolean-literal-type](https://ilyub.github.io/eslint-plugin-misc/typescript/no-boolean-literal-type.html) &mdash; Disallows boolean literal type.
- [typescript/no-complex-declarator-type](https://ilyub.github.io/eslint-plugin-misc/typescript/no-complex-declarator-type.html) &mdash; Disallow complex declarator types.
- [typescript/no-complex-return-type](https://ilyub.github.io/eslint-plugin-misc/typescript/no-complex-return-type.html) &mdash; Disallow complex function return types.
- [typescript/no-empty-interfaces](https://ilyub.github.io/eslint-plugin-misc/typescript/no-empty-interfaces.html) &mdash; Disallow empty interfaces.
- [typescript/no-inferrable-types](https://ilyub.github.io/eslint-plugin-misc/typescript/no-inferrable-types.html) &mdash; Reports inferrable types.
- [typescript/no-multi-type-tuples](https://ilyub.github.io/eslint-plugin-misc/typescript/no-multi-type-tuples.html) &mdash; Disallows multi-type tuples.
- [typescript/no-never](https://ilyub.github.io/eslint-plugin-misc/typescript/no-never.html) &mdash; Disallow "never" type.
- [typescript/no-restricted-syntax](https://ilyub.github.io/eslint-plugin-misc/typescript/no-restricted-syntax.html) &mdash; Disallows AST syntax with additional type check.
- [typescript/no-unsafe-object-assign](https://ilyub.github.io/eslint-plugin-misc/typescript/no-unsafe-object-assign.html) &mdash; Disallows unsafe "Object.assign".
- [typescript/no-unsafe-object-assignment](https://ilyub.github.io/eslint-plugin-misc/typescript/no-unsafe-object-assignment.html) &mdash; Reports unsafe object assignments.
- [typescript/prefer-array-type-alias](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-array-type-alias.html) &mdash; Disallows unsafe "Object.assign".
- [typescript/prefer-class-method](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-class-method.html) &mdash; Requires use of class methods instead of function properties.
- [typescript/prefer-enum](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-enum.html) &mdash; Requires using enums instead of string literals.
- [typescript/prefer-readonly-array](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-readonly-array.html) &mdash; Disallows writable arrays.
- [typescript/prefer-readonly-map](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-readonly-map.html) &mdash; Disallows writable maps.
- [typescript/prefer-readonly-property](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-readonly-property.html) &mdash; Disallows writable properties.
- [typescript/prefer-readonly-set](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-readonly-set.html) &mdash; Disallows writable sets.
- [typescript/require-prop-type-annotation](https://ilyub.github.io/eslint-plugin-misc/typescript/require-prop-type-annotation.html) &mdash; Requires type annotation for class properties.
- [typescript/require-this-void](https://ilyub.github.io/eslint-plugin-misc/typescript/require-this-void.html) &mdash; Requires "this: void" for static methods.
- [vue/component-name](https://ilyub.github.io/eslint-plugin-misc/vue/component-name.html) &mdash; Requires using enums instead of string literals.
- [vue/element-contents-spacing](https://ilyub.github.io/eslint-plugin-misc/vue/element-contents-spacing.html) &mdash; Controls spaces around HTML element contents.
- [vue/no-complex-declarator-type](https://ilyub.github.io/eslint-plugin-misc/vue/no-complex-declarator-type.html) &mdash; Disallow complex declarator types.
- [vue/no-complex-return-type](https://ilyub.github.io/eslint-plugin-misc/vue/no-complex-return-type.html) &mdash; Disallow complex function return types.
- [vue/no-empty-lines](https://ilyub.github.io/eslint-plugin-misc/vue/no-empty-lines.html) &mdash; Disallow empty lines inside &lt;template&gt; section.
- [vue/no-readonly-v-model](https://ilyub.github.io/eslint-plugin-misc/vue/no-readonly-v-model.html) &mdash; Disallows using readonly property as model value.
- [vue/sort-v-bind](https://ilyub.github.io/eslint-plugin-misc/vue/sort-v-bind.html) &mdash; Sorts "v-bind" directive.

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
- [no-restricted-syntax](https://ilyub.github.io/eslint-plugin-misc/no-restricted-syntax.html) &mdash; Disallows AST syntax (an extended version of ESLint core rule).
- [require-syntax](https://ilyub.github.io/eslint-plugin-misc/require-syntax.html) &mdash; Requires AST syntax.
- [wrap](https://ilyub.github.io/eslint-plugin-misc/wrap.html) &mdash; Wraps and modifies third-party rule.
- [typescript/no-restricted-syntax](https://ilyub.github.io/eslint-plugin-misc/typescript/no-restricted-syntax.html) &mdash; Disallows AST syntax with additional type check.

If you want to apply one rule several times (e.g. restrict several syntaxes), use rule synonyms.

## <a name="rules-under-consideration"></a>Rules under consideration

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