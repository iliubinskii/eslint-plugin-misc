# no-relative-parent-import

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-relative-parent-import

Disallows relative parent import.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-relative-parent-import": "error"
  }
};
```

## Examples of incorrect code

```ts
import x from "../source";
```

## Examples of correct code

```ts
import x from "./source";
```
