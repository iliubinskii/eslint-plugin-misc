# typescript/no-never

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/no-never

Disallow "never" type.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/no-never": "error"
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