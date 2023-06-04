# typescript/exhaustive-switch

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / typescript/exhaustive-switch

Checks exhaustiveness of switch statement.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/exhaustive-switch": "error"
  }
};
```

## Examples of incorrect code

```ts
function f(x: 1 | 2): void {
  switch (x) {
    case 1:
  }
}
```

## Examples of correct code

```ts
function f(x: 1 | 2): void {
  switch (x) {
    case 1:
    case 2:
  }
}
```