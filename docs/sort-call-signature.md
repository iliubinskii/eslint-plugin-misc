# sort-call-signature

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / sort-call-signature

## Overview

Requires call signature to be first child.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/sort-call-signature": "error"
  }
};
```

## Examples of incorrect code

```ts
interface I {
  x: string;
  (): string;
}
```

## Examples of correct code

```ts
interface I {
  (): string;
  x: string;
}
```