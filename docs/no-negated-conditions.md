# no-negated-conditions

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-negated-conditions

Disallows negated conditions.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-negated-conditions": "error"
  }
};
```

## Examples of incorrect code

```ts
if (!x && y) {}
if (x !== -1 && y) {}
```

## Examples of correct code

```ts
if (x && !y) {}
if (x && y !== -1) {}
```
