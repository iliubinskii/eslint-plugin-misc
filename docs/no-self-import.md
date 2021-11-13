[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-self-import

# no-self-import

Disallows self-import.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-self-import": "error"
  }
};
```

## Examples of incorrect code

```ts
// filename: file.ts
import { a } from "./file";
import { b } from "./file.ts";
```

## Examples of correct code

```ts
// filename: file.ts
import { a } from "@/file";
import { b } from "@/file.ts";
```