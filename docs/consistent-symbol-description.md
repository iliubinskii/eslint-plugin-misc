[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / consistent-symbol-description

# consistent-symbol-description

Requires consistent symbol description.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/consistent-symbol-description": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = Symbol("SampleDescription");
```

## Examples of correct code

```ts
const x = Symbol("kebab-case__kebab-case");
```