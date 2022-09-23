# typescript/prefer-readonly-array

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/prefer-readonly-array

## Overview

Disallows writable arrays.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/prefer-readonly-array": "error"
  }
};
```

## Examples of incorrect code

```ts
function f(x: string[]) {}
function g(x: [string]) {}
function h(x: Array<string>) {}
```

## Examples of correct code

```ts
function f(x: readonly string[]) {}
function g(x: readonly [string]) {}
function h(x: ReadonlyArray<string>) {}
```