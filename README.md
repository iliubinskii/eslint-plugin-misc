# ESLint plugin

## Table of contents

- [Installation](#installation)
- [Rules](#rules)
- [Shared options](#shared-options)

## <a name="installation"></a>Installation

```
npm install --save-dev @skylib/eslint-plugin
```

## <a name="rules"></a>Rules

- [class-match-filename](https://ilyub.github.io/eslint-plugin/class-match-filename.html)
- [class-only-export](https://ilyub.github.io/eslint-plugin/class-only-export.html)
- [comment-spacing](https://ilyub.github.io/eslint-plugin/comment-spacing.html)
- [consistent-empty-lines](https://ilyub.github.io/eslint-plugin/consistent-empty-lines.html)
- [consistent-enum-members](https://ilyub.github.io/eslint-plugin/consistent-enum-members.html)
- [consistent-filename](https://ilyub.github.io/eslint-plugin/consistent-filename.html)
- [consistent-import](https://ilyub.github.io/eslint-plugin/consistent-import.html)
- [consistent-optional-props](https://ilyub.github.io/eslint-plugin/consistent-optional-props.html)
- [consistent-source-extension](https://ilyub.github.io/eslint-plugin/consistent-source-extension.html)
- [consistent-symbol-description](https://ilyub.github.io/eslint-plugin/consistent-symbol-description.html)
- [disallow-import](https://ilyub.github.io/eslint-plugin/disallow-import.html)
- [export-matching-filename-only](https://ilyub.github.io/eslint-plugin/export-matching-filename-only.html)
- [match-filename](https://ilyub.github.io/eslint-plugin/match-filename.html)
- [max-identifier-blocks](https://ilyub.github.io/eslint-plugin/max-identifier-blocks.html)
- [no-at-sign-import](https://ilyub.github.io/eslint-plugin/no-at-sign-import.html)
- [no-at-sign-internal-import](https://ilyub.github.io/eslint-plugin/no-at-sign-internal-import.html)
- [no-chain-coalescence-mixture](https://ilyub.github.io/eslint-plugin/no-chain-coalescence-mixture.html)
- [no-expression-empty-lines](https://ilyub.github.io/eslint-plugin/no-expression-empty-lines.html)
- [no-index-import](https://ilyub.github.io/eslint-plugin/no-index-import.html)
- [no-internal-modules](https://ilyub.github.io/eslint-plugin/no-internal-modules.html)
- [no-language-mixing](https://ilyub.github.io/eslint-plugin/no-language-mixing.html)
- [no-negated-conditions](https://ilyub.github.io/eslint-plugin/no-negated-conditions.html)
- [no-nodejs-modules](https://ilyub.github.io/eslint-plugin/no-nodejs-modules.html)
- [no-relative-parent-import](https://ilyub.github.io/eslint-plugin/no-relative-parent-import.html)
- [no-restricted-syntax](https://ilyub.github.io/eslint-plugin/no-restricted-syntax.html)
- [no-self-import](https://ilyub.github.io/eslint-plugin/no-self-import.html)
- [no-sibling-import](https://ilyub.github.io/eslint-plugin/no-sibling-import.html)
- [no-underscore-export](https://ilyub.github.io/eslint-plugin/no-underscore-export.html)
- [no-unnecessary-as-const](https://ilyub.github.io/eslint-plugin/no-unnecessary-as-const.html)
- [no-unnecessary-break](https://ilyub.github.io/eslint-plugin/no-unnecessary-break.html)
- [no-unnecessary-initialization](https://ilyub.github.io/eslint-plugin/no-unnecessary-initialization.html)
- [no-unnecessary-template-literal](https://ilyub.github.io/eslint-plugin/no-unnecessary-template-literal.html)
- [object-format](https://ilyub.github.io/eslint-plugin/object-format.html)
- [only-export-name](https://ilyub.github.io/eslint-plugin/only-export-name.html)
- [prefer-arrow-function-property](https://ilyub.github.io/eslint-plugin/prefer-arrow-function-property.html)
- [prefer-arrow-static-method](https://ilyub.github.io/eslint-plugin/prefer-arrow-static-method.html)
- [prefer-const-require](https://ilyub.github.io/eslint-plugin/prefer-const-require.html)
- [prefer-only-export](https://ilyub.github.io/eslint-plugin/prefer-only-export.html)
- [require-jsdoc](https://ilyub.github.io/eslint-plugin/require-jsdoc.html)
- [require-syntax](https://ilyub.github.io/eslint-plugin/require-syntax.html)
- [restrict-identifier-characters](https://ilyub.github.io/eslint-plugin/restrict-identifier-characters.html)
- [sort-array](https://ilyub.github.io/eslint-plugin/sort-array.html)
- [sort-call-signature](https://ilyub.github.io/eslint-plugin/sort-call-signature.html)
- [sort-class-members](https://ilyub.github.io/eslint-plugin/sort-class-members.html)
- [sort-construct-signature](https://ilyub.github.io/eslint-plugin/sort-construct-signature.html)
- [sort-keys](https://ilyub.github.io/eslint-plugin/sort-keys.html)
- [sort-statements](https://ilyub.github.io/eslint-plugin/sort-statements.html)
- [sort-top-comments](https://ilyub.github.io/eslint-plugin/sort-top-comments.html)
- [switch-case-spacing](https://ilyub.github.io/eslint-plugin/switch-case-spacing.html)
- [template-literal-format](https://ilyub.github.io/eslint-plugin/template-literal-format.html)
- [wrap](https://ilyub.github.io/eslint-plugin/wrap.html)
- [eslintrc/no-message-dot](https://ilyub.github.io/eslint-plugin/eslintrc/no-message-dot.html)
- [eslintrc/no-unnecessary-array](https://ilyub.github.io/eslint-plugin/eslintrc/no-unnecessary-array.html)
- [eslintrc/sort-array](https://ilyub.github.io/eslint-plugin/eslintrc/sort-array.html)
- [eslintrc/sort-suboptions](https://ilyub.github.io/eslint-plugin/eslintrc/sort-suboptions.html)
- [jest/no-toThrow-literal](https://ilyub.github.io/eslint-plugin/jest/no-toThrow-literal.html)
- [jest/prefer-toBe](https://ilyub.github.io/eslint-plugin/jest/prefer-toBe.html)
- [jest/prefer-toStrictEqual](https://ilyub.github.io/eslint-plugin/jest/prefer-toStrictEqual.html)
- [typescript/array-callback-return-type](https://ilyub.github.io/eslint-plugin/typescript/array-callback-return-type.html)
- [typescript/consistent-array-type-name](https://ilyub.github.io/eslint-plugin/typescript/consistent-array-type-name.html)
- [typescript/define-function-in-one-statement](https://ilyub.github.io/eslint-plugin/typescript/define-function-in-one-statement.html)
- [typescript/exhaustive-switch](https://ilyub.github.io/eslint-plugin/typescript/exhaustive-switch.html)
- [typescript/no-boolean-literal-type](https://ilyub.github.io/eslint-plugin/typescript/no-boolean-literal-type.html)
- [typescript/no-complex-declarator-type](https://ilyub.github.io/eslint-plugin/typescript/no-complex-declarator-type.html)
- [typescript/no-complex-return-type](https://ilyub.github.io/eslint-plugin/typescript/no-complex-return-type.html)
- [typescript/no-empty-interfaces](https://ilyub.github.io/eslint-plugin/typescript/no-empty-interfaces.html)
- [typescript/no-inferrable-types](https://ilyub.github.io/eslint-plugin/typescript/no-inferrable-types.html)
- [typescript/no-multi-type-tuples](https://ilyub.github.io/eslint-plugin/typescript/no-multi-type-tuples.html)
- [typescript/no-never](https://ilyub.github.io/eslint-plugin/typescript/no-never.html)
- [typescript/no-restricted-syntax](https://ilyub.github.io/eslint-plugin/typescript/no-restricted-syntax.html)
- [typescript/no-shadow](https://ilyub.github.io/eslint-plugin/typescript/no-shadow.html)
- [typescript/no-this-void](https://ilyub.github.io/eslint-plugin/typescript/no-this-void.html)
- [typescript/no-unsafe-object-assign](https://ilyub.github.io/eslint-plugin/typescript/no-unsafe-object-assign.html)
- [typescript/no-unsafe-object-assignment](https://ilyub.github.io/eslint-plugin/typescript/no-unsafe-object-assignment.html)
- [typescript/prefer-array-type-alias](https://ilyub.github.io/eslint-plugin/typescript/prefer-array-type-alias.html)
- [typescript/prefer-enum](https://ilyub.github.io/eslint-plugin/typescript/prefer-enum.html)
- [typescript/prefer-readonly-array](https://ilyub.github.io/eslint-plugin/typescript/prefer-readonly-array.html)
- [typescript/prefer-readonly-property](https://ilyub.github.io/eslint-plugin/typescript/prefer-readonly-property.html)
- [typescript/prefer-ReadonlyMap](https://ilyub.github.io/eslint-plugin/typescript/prefer-ReadonlyMap.html)
- [typescript/prefer-ReadonlySet](https://ilyub.github.io/eslint-plugin/typescript/prefer-ReadonlySet.html)
- [typescript/require-prop-type-annotation](https://ilyub.github.io/eslint-plugin/typescript/require-prop-type-annotation.html)
- [vue/component-name](https://ilyub.github.io/eslint-plugin/vue/component-name.html)
- [vue/element-contents-spacing](https://ilyub.github.io/eslint-plugin/vue/element-contents-spacing.html)
- [vue/no-complex-declarator-type](https://ilyub.github.io/eslint-plugin/vue/no-complex-declarator-type.html)
- [vue/no-complex-return-type](https://ilyub.github.io/eslint-plugin/vue/no-complex-return-type.html)
- [vue/no-empty-lines](https://ilyub.github.io/eslint-plugin/vue/no-empty-lines.html)
- [vue/sort-v-bind](https://ilyub.github.io/eslint-plugin/vue/sort-v-bind.html)

## <a name="shared-options"></a>Shared options

### eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/<rule-id>": [
      "error",
      {
        <sub-options-key>: [
          {
            filesToLint?: string[],
            filesToSkip?: string[],
            ...
          }
        ]
      }
    ]
  }
}
```

| Option | Description | Default |
| :----- | :----- | :----- |
| `filesToLint` | Files to lint (minimatch patterns) | [] |
| `filesToSkip` | Files to skip (minimatch patterns) | [] |