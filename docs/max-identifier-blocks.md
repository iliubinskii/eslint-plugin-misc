[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / max-identifier-blocks

# max-identifier-blocks

Restricts identifier complexity.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/max-identifier-blocks": "error"
  }
};
```

## Examples of incorrect code

```ts
function firstSecondThirdFourthPart() {}
```

## Examples of correct code

```ts
function firstSecondThirdPart() {}
```