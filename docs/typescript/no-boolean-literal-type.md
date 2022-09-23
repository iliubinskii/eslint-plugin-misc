# typescript/no-boolean-literal-type

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/no-boolean-literal-type

## Overview

Disallows boolean literal type.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/no-boolean-literal-type": "error"
  }
};
```

## Examples of incorrect code

```ts
interface I {
  x?: true;
  y?: false;
}
```

## Examples of correct code

```ts
interface I {
  x?: boolean;
}
```