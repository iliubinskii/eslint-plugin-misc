# no-param-reassign

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / no-param-reassign

## Overview

This rule wraps "no-param-reassign" core rule, but allows to edit params at the top of function body.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-param-reassign": "error"
  }
};
```

## Examples of incorrect code

```ts
function f(x, y) {
  x;
  y++;
}
```

## Examples of correct code

```ts
function f(x, y) {
  x++;
  y;
}
```