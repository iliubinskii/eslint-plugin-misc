# typescript/prefer-readonly-set

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / typescript/prefer-readonly-set

Disallows writable sets.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/prefer-readonly-set": "error"
  }
};
```

## Examples of incorrect code

```ts
function f(x: Set<string>) {}
```

## Examples of correct code

```ts
function f(x: ReadonlySet<string>) {}
```