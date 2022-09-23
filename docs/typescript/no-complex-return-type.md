# typescript/no-complex-return-type

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/no-complex-return-type

## Overview

Disallow complex function return types.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/no-complex-return-type": "error"
  }
};
```

## Examples of incorrect code

```ts
function f() {
  return { x: 1 };
}
```

## Examples of correct code

```ts
function f(): object {
  return { x: 1 };
}
```