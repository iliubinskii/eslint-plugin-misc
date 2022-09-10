[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / no-negated-conditions

# no-negated-conditions

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
if (!x) {}
if (x !== 1) {}
```

## Examples of correct code

```ts
if (x) {}
if (x === 1) {}
```