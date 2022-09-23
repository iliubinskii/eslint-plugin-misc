# no-expression-empty-lines

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / no-expression-empty-lines

## Overview

Disallows empty lines inside expressions.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-expression-empty-lines": "error"
  }
};
```

## Examples of incorrect code

```ts
const result = []

  .map(x => x)

  .map(x => x);
```

## Examples of correct code

```ts
const result = []
  .map(x => x)
  .map(x => x);
```