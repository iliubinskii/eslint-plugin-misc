[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/no-multi-type-tuples

# typescript/no-multi-type-tuples

Disallows multi-type tuples.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-multi-type-tuples": "error"
  }
};
```

## Examples of incorrect code

```ts
type T = [string, number];
```

## Examples of correct code

```ts
type T = [string, string];
```