# typescript/no-multi-type-tuples

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/no-multi-type-tuples

## Overview

Disallows multi-type tuples.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/no-multi-type-tuples": "error"
  }
};
```

## Examples of incorrect code

```ts
type T = [string, number];
```

## Examples of correct code

```ts
type T = [string, string];
```