# restrict-identifier-characters

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / restrict-identifier-characters

Requires "require()" to be assigned to variable.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/restrict-identifier-characters": "error"
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