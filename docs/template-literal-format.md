[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / template-literal-format

# template-literal-format

Requires consistent padding in template literals.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/template-literal-format": "error"
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