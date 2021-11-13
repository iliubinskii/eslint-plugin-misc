[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-relative-parent-import

# no-relative-parent-import

Disallows relative parent import.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-relative-parent-import": "error"
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