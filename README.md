# ESLint plugin

## Table of contents

- [Installation](#installation)
- [Rules](#rules)
- [Shared options](#shared-options)

## <a name="installation"></a>Installation

```
npm install --save-dev eslint-plugin-misc
```

## <a name="rules"></a>Rules

- [class-match-filename](https://ilyub.github.io/eslint-plugin-misc/class-match-filename.html)
- [comment-spacing](https://ilyub.github.io/eslint-plugin-misc/comment-spacing.html)
- [consistent-empty-lines](https://ilyub.github.io/eslint-plugin-misc/consistent-empty-lines.html)
- [consistent-enum-members](https://ilyub.github.io/eslint-plugin-misc/consistent-enum-members.html)
- [consistent-filename](https://ilyub.github.io/eslint-plugin-misc/consistent-filename.html)
- [consistent-import](https://ilyub.github.io/eslint-plugin-misc/consistent-import.html)
- [consistent-optional-props](https://ilyub.github.io/eslint-plugin-misc/consistent-optional-props.html)
- [consistent-source-extension](https://ilyub.github.io/eslint-plugin-misc/consistent-source-extension.html)
- [consistent-symbol-description](https://ilyub.github.io/eslint-plugin-misc/consistent-symbol-description.html)
- [disallow-import](https://ilyub.github.io/eslint-plugin-misc/disallow-import.html)
- [export-matching-filename-only](https://ilyub.github.io/eslint-plugin-misc/export-matching-filename-only.html)
- [match-filename](https://ilyub.github.io/eslint-plugin-misc/match-filename.html)
- [max-identifier-blocks](https://ilyub.github.io/eslint-plugin-misc/max-identifier-blocks.html)
- [no-at-sign-import](https://ilyub.github.io/eslint-plugin-misc/no-at-sign-import.html)
- [no-at-sign-internal-import](https://ilyub.github.io/eslint-plugin-misc/no-at-sign-internal-import.html)
- [no-chain-coalescence-mixture](https://ilyub.github.io/eslint-plugin-misc/no-chain-coalescence-mixture.html)
- [no-expression-empty-lines](https://ilyub.github.io/eslint-plugin-misc/no-expression-empty-lines.html)
- [no-index-import](https://ilyub.github.io/eslint-plugin-misc/no-index-import.html)
- [no-internal-modules](https://ilyub.github.io/eslint-plugin-misc/no-internal-modules.html)
- [no-language-mixing](https://ilyub.github.io/eslint-plugin-misc/no-language-mixing.html)
- [no-negated-conditions](https://ilyub.github.io/eslint-plugin-misc/no-negated-conditions.html)
- [no-nodejs-modules](https://ilyub.github.io/eslint-plugin-misc/no-nodejs-modules.html)
- [no-relative-parent-import](https://ilyub.github.io/eslint-plugin-misc/no-relative-parent-import.html)
- [no-restricted-syntax](https://ilyub.github.io/eslint-plugin-misc/no-restricted-syntax.html)
- [no-self-import](https://ilyub.github.io/eslint-plugin-misc/no-self-import.html)
- [no-sibling-import](https://ilyub.github.io/eslint-plugin-misc/no-sibling-import.html)
- [no-underscore-export](https://ilyub.github.io/eslint-plugin-misc/no-underscore-export.html)
- [no-unnecessary-as-const](https://ilyub.github.io/eslint-plugin-misc/no-unnecessary-as-const.html)
- [no-unnecessary-break](https://ilyub.github.io/eslint-plugin-misc/no-unnecessary-break.html)
- [no-unnecessary-initialization](https://ilyub.github.io/eslint-plugin-misc/no-unnecessary-initialization.html)
- [no-unnecessary-template-literal](https://ilyub.github.io/eslint-plugin-misc/no-unnecessary-template-literal.html)
- [object-format](https://ilyub.github.io/eslint-plugin-misc/object-format.html)
- [only-export-name](https://ilyub.github.io/eslint-plugin-misc/only-export-name.html)
- [prefer-arrow-function-property](https://ilyub.github.io/eslint-plugin-misc/prefer-arrow-function-property.html)
- [prefer-arrow-static-method](https://ilyub.github.io/eslint-plugin-misc/prefer-arrow-static-method.html)
- [prefer-const-require](https://ilyub.github.io/eslint-plugin-misc/prefer-const-require.html)
- [prefer-only-export](https://ilyub.github.io/eslint-plugin-misc/prefer-only-export.html)
- [require-jsdoc](https://ilyub.github.io/eslint-plugin-misc/require-jsdoc.html)
- [require-syntax](https://ilyub.github.io/eslint-plugin-misc/require-syntax.html)
- [restrict-identifier-characters](https://ilyub.github.io/eslint-plugin-misc/restrict-identifier-characters.html)
- [sort-array](https://ilyub.github.io/eslint-plugin-misc/sort-array.html)
- [sort-call-signature](https://ilyub.github.io/eslint-plugin-misc/sort-call-signature.html)
- [sort-class-members](https://ilyub.github.io/eslint-plugin-misc/sort-class-members.html)
- [sort-construct-signature](https://ilyub.github.io/eslint-plugin-misc/sort-construct-signature.html)
- [sort-keys](https://ilyub.github.io/eslint-plugin-misc/sort-keys.html)
- [sort-statements](https://ilyub.github.io/eslint-plugin-misc/sort-statements.html)
- [sort-top-comments](https://ilyub.github.io/eslint-plugin-misc/sort-top-comments.html)
- [switch-case-spacing](https://ilyub.github.io/eslint-plugin-misc/switch-case-spacing.html)
- [template-literal-format](https://ilyub.github.io/eslint-plugin-misc/template-literal-format.html)
- [wrap](https://ilyub.github.io/eslint-plugin-misc/wrap.html)
- [eslintrc/no-message-dot](https://ilyub.github.io/eslint-plugin-misc/eslintrc/no-message-dot.html)
- [eslintrc/no-unnecessary-array](https://ilyub.github.io/eslint-plugin-misc/eslintrc/no-unnecessary-array.html)
- [eslintrc/sort-array](https://ilyub.github.io/eslint-plugin-misc/eslintrc/sort-array.html)
- [eslintrc/sort-suboptions](https://ilyub.github.io/eslint-plugin-misc/eslintrc/sort-suboptions.html)
- [jest/no-toThrow-literal](https://ilyub.github.io/eslint-plugin-misc/jest/no-toThrow-literal.html)
- [jest/prefer-toBe](https://ilyub.github.io/eslint-plugin-misc/jest/prefer-toBe.html)
- [jest/prefer-toStrictEqual](https://ilyub.github.io/eslint-plugin-misc/jest/prefer-toStrictEqual.html)
- [typescript/array-callback-return-type](https://ilyub.github.io/eslint-plugin-misc/typescript/array-callback-return-type.html)
- [typescript/consistent-array-type-name](https://ilyub.github.io/eslint-plugin-misc/typescript/consistent-array-type-name.html)
- [typescript/define-function-in-one-statement](https://ilyub.github.io/eslint-plugin-misc/typescript/define-function-in-one-statement.html)
- [typescript/exhaustive-switch](https://ilyub.github.io/eslint-plugin-misc/typescript/exhaustive-switch.html)
- [typescript/no-boolean-literal-type](https://ilyub.github.io/eslint-plugin-misc/typescript/no-boolean-literal-type.html)
- [typescript/no-complex-declarator-type](https://ilyub.github.io/eslint-plugin-misc/typescript/no-complex-declarator-type.html)
- [typescript/no-complex-return-type](https://ilyub.github.io/eslint-plugin-misc/typescript/no-complex-return-type.html)
- [typescript/no-empty-interfaces](https://ilyub.github.io/eslint-plugin-misc/typescript/no-empty-interfaces.html)
- [typescript/no-inferrable-types](https://ilyub.github.io/eslint-plugin-misc/typescript/no-inferrable-types.html)
- [typescript/no-multi-type-tuples](https://ilyub.github.io/eslint-plugin-misc/typescript/no-multi-type-tuples.html)
- [typescript/no-never](https://ilyub.github.io/eslint-plugin-misc/typescript/no-never.html)
- [typescript/no-restricted-syntax](https://ilyub.github.io/eslint-plugin-misc/typescript/no-restricted-syntax.html)
- [typescript/no-shadow](https://ilyub.github.io/eslint-plugin-misc/typescript/no-shadow.html)
- [typescript/no-this-void](https://ilyub.github.io/eslint-plugin-misc/typescript/no-this-void.html)
- [typescript/no-unsafe-object-assign](https://ilyub.github.io/eslint-plugin-misc/typescript/no-unsafe-object-assign.html)
- [typescript/no-unsafe-object-assignment](https://ilyub.github.io/eslint-plugin-misc/typescript/no-unsafe-object-assignment.html)
- [typescript/prefer-array-type-alias](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-array-type-alias.html)
- [typescript/prefer-enum](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-enum.html)
- [typescript/prefer-readonly-array](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-readonly-array.html)
- [typescript/prefer-readonly-property](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-readonly-property.html)
- [typescript/prefer-ReadonlyMap](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-ReadonlyMap.html)
- [typescript/prefer-ReadonlySet](https://ilyub.github.io/eslint-plugin-misc/typescript/prefer-ReadonlySet.html)
- [typescript/require-prop-type-annotation](https://ilyub.github.io/eslint-plugin-misc/typescript/require-prop-type-annotation.html)
- [vue/component-name](https://ilyub.github.io/eslint-plugin-misc/vue/component-name.html)
- [vue/element-contents-spacing](https://ilyub.github.io/eslint-plugin-misc/vue/element-contents-spacing.html)
- [vue/no-complex-declarator-type](https://ilyub.github.io/eslint-plugin-misc/vue/no-complex-declarator-type.html)
- [vue/no-complex-return-type](https://ilyub.github.io/eslint-plugin-misc/vue/no-complex-return-type.html)
- [vue/no-empty-lines](https://ilyub.github.io/eslint-plugin-misc/vue/no-empty-lines.html)
- [vue/sort-v-bind](https://ilyub.github.io/eslint-plugin-misc/vue/sort-v-bind.html)

## <a name="shared-options"></a>Shared options

### eslintrc.js

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/<rule-id>": [
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
