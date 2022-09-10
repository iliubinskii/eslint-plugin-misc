[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / max-identifier-blocks

# max-identifier-blocks

Restricts identifier complexity.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/max-identifier-blocks": "error"
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