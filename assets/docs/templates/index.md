# ESLint plugin with misc rules

## Table of contents

- [Overview](#overview)
- [Custom checks](#custom-checks)
- [Rule synonyms](#rule-synonyms)
- [Configs](#configs)
- [Rules](#rules)

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

## <a name="custom-checks"></a>Custom checks

The following rules can be used to create custom checks:
  - no-restricted-syntax &mdash; Disallows AST syntax (an extended version of ESLint core rule).
  - require-syntax &mdash; Requires AST syntax.
  - wrap &mdash; Allows to modify third-party rule.
  - typescript/no-restricted-syntax &mdash; Disallows AST syntax with additional type check.

If you want to apply one rule several times (e.g. you want to restrict several syntaxes), use rule synonyms.

## <a name="rule-synonyms"></a>Rule synonyms

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

## <a name="configs"></a>Configs

- plugin:misc/all &mdash; All rules.
- plugin:misc/core &mdash; Core rules.
- plugin:misc/eslintrc &mdash; Rules for ESLint configuration files.
- plugin:misc/jest &mdash; Rules for Jest test files.
- plugin:misc/typescript &mdash; Rules for typescript files.
- plugin:misc/vue &mdash; Rules for Vue single-file components.

## <a name="rules"></a>Rules

{{rules}}
