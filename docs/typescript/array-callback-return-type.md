# typescript/array-callback-return-type

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/array-callback-return-type

## Overview

Requires boolean return type in array callbacks.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/array-callback-return-type": "error"
  }
};
```

## Examples of incorrect code

```ts
[1, true].every(x => x);
```

## Examples of correct code

```ts
[1].every(x => x);
[""].every(x => x);
[false].every(x => x);
```