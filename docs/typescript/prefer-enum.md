# typescript/prefer-enum

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / typescript/prefer-enum

Requires using enums instead of string literals.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/prefer-enum": "error"
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
