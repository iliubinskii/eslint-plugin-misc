[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/no-never

# typescript/no-never

Disallow "never" type.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-never": "error"
  }
};
```

## Examples of incorrect code

```ts
function f(value: "a" & "b") {}
```

## Examples of correct code

```ts
function f(value: "a" | "b") {}
```