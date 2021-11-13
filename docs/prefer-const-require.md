[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / prefer-const-require

# prefer-const-require

Requires "require()" to be assigned to variable.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/prefer-const-require": "error"
  }
};
```

## Examples of incorrect code

```ts
function f() { return require("node:path"); }
```

## Examples of correct code

```ts
const path = require("node:path");
```