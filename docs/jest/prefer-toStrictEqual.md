[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / jest/prefer-toStrictEqual

# jest/prefer-toStrictEqual

Requires "toStrictEqual" matcher instead of "toBe" for non-primitive argument types.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/jest/prefer-toStrictEqual": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = {};
expect(y).toStrictEqual(x);
```

## Examples of correct code

```ts
const x = 1;
expect(y).toStrictEqual(x);
```