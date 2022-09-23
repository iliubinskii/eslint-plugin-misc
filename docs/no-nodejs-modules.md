# no-nodejs-modules

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / no-nodejs-modules

## Overview

Disallows importing NodeJS modules.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-nodejs-modules": "error"
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