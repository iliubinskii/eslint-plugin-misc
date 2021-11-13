[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/prefer-ReadonlySet

# typescript/prefer-ReadonlySet

Disallows writable sets.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-ReadonlySet": "error"
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