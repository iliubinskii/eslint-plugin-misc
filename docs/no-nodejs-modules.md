[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-nodejs-modules

# no-nodejs-modules

Disallows importing NodeJS modules.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-nodejs-modules": "error"
  }
};
```

## Examples of incorrect code

```ts
import x from "node:fs";
```

## Examples of correct code

```ts
import x from "fs";
```