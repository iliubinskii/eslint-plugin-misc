# jest/prefer-toBe

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / jest/prefer-toBe

Requires "toBe" matcher instead of "toStrictEqual" for primitive argument types.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/jest/prefer-toBe": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = 1;
expect(y).toStrictEqual(x);
```

## Examples of correct code

```ts
const x = {};
expect(y).toStrictEqual(x);
```
