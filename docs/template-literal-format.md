# template-literal-format

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / template-literal-format

Requires consistent padding in template literals.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/template-literal-format": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = `
    text
    `;
```

## Examples of correct code

```ts
const x = `
  text
`;
```
