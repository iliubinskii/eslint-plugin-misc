[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-unnecessary-template-literal

# no-unnecessary-template-literal

Disallows unnecessary template literals.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-unnecessary-template-literal": "error"
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
const x = "text";

const y = `
  text
  text
`;

const z = `
  text ${x} text
`;
```