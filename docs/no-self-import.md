# no-self-import

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-self-import

Disallows self-import.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-self-import": "error"
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