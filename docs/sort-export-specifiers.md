# sort-export-specifiers

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / sort-export-specifiers

Sorts export specifiers.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/sort-export-specifiers": "error"
  }
};
```

## Examples of incorrect code

```ts
export { b, a };
```

## Examples of correct code

```ts
export { a, b };
```