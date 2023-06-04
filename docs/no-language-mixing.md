# no-language-mixing

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-language-mixing

Disallows language mixing.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-language-mixing": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = "xyz123абв";
```

## Examples of correct code

```ts
const x = "xyz";
const y = "123";
const z = "абв";
```