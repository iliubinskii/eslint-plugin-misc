[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/no-shadow

# typescript/no-shadow

This rule wraps "@typescript-eslint/no-shadow" rule, but skips checking enum.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-shadow": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = 1;
function f() { const x = 1; }
```

## Examples of correct code

```ts
const x = 1;
enum E { x = "x" }
```