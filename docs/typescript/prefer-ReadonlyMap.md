[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/prefer-ReadonlyMap

# typescript/prefer-ReadonlyMap

Disallows writable maps.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-ReadonlyMap": "error"
  }
};
```

## Examples of incorrect code

```ts
function f(x: Map<string, string>) {}
```

## Examples of correct code

```ts
function f(x: ReadonlyMap<string, string>) {}
```