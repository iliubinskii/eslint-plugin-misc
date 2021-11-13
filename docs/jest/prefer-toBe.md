[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / jest/prefer-toBe

# jest/prefer-toBe

Requires "toBe" matcher instead of "toStrictEqual" for primitive argument types.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/jest/prefer-toBe": "error"
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