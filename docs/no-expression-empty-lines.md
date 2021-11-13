[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-expression-empty-lines

# no-expression-empty-lines

Disallows empty lines inside expressions.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-expression-empty-lines": "error"
  }
};
```

## Examples of incorrect code

```ts
const result = []

  .map(x => x)

  .map(x => x);
```

## Examples of correct code

```ts
const result = []
  .map(x => x)
  .map(x => x);
```