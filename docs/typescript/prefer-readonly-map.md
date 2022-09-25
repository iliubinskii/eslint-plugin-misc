# typescript/prefer-readonly-map

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/prefer-readonly-map

Disallows writable maps.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/prefer-readonly-map": "error"
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