[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/prefer-enum

# typescript/prefer-enum

Requires using enums instead of string literals.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-enum": "error"
  }
};
```

## Examples of incorrect code

```ts
type T = "a" | "b";
```

## Examples of correct code

```ts
enum T {
  a = "a",
  b = "b"
};
```