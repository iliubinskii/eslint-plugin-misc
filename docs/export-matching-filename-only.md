[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / export-matching-filename-only

# export-matching-filename-only

Requires that export matching filename is the only export.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/export-matching-filename-only": "error"
  }
};
```

## Examples of incorrect code

```ts
// filename: file.ts
export const file = 1;
export const x = 1;
```

## Examples of correct code

```ts
// filename: file.ts
export const file = 1;
```