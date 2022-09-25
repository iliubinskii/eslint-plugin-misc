# jest/prefer-toStrictEqual

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / jest/prefer-toStrictEqual

Requires "toStrictEqual" matcher instead of "toBe" for non-primitive argument types.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/jest/prefer-toStrictEqual": "error"
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