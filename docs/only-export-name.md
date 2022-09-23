# only-export-name

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / only-export-name

## Overview

Requires that only export matches filename.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/only-export-name": "error"
  }
};
```

## Examples of incorrect code

```ts
// filename: file.ts
export class SampleClass {}
```

## Examples of correct code

```ts
// filename: SampleClass.ts
export class SampleClass {}
```