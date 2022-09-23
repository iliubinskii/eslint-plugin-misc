# export-matching-filename-only

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / export-matching-filename-only

## Overview

Requires that export matching filename is the only export.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/export-matching-filename-only": "error"
  }
};
```

## Examples of incorrect code

```ts
// filename: file.ts
export const file = 1;
export const x = 1;
```

## Examples of correct code

```ts
// filename: file.ts
export const file = 1;
```