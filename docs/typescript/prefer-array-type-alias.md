# typescript/prefer-array-type-alias

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / typescript/prefer-array-type-alias

Prefer alias for array type.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/prefer-array-type-alias": "error"
  }
};
```

## Examples of incorrect code

```ts
function f(x: readonly string[]) {}
```

## Examples of correct code

```ts
type strings = readonly string[];
function f(x: strings) {}
```
