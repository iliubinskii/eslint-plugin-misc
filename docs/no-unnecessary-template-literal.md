# no-unnecessary-template-literal

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-unnecessary-template-literal

Disallows unnecessary template literals.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-unnecessary-template-literal": "error"
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
