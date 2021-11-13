[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / consistent-symbol-description

# consistent-symbol-description

Requires consistent symbol description.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-symbol-description": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = Symbol("kebab-case__kebab-case");
```

## Examples of correct code

```ts
const x = Symbol("PascalCase");
```