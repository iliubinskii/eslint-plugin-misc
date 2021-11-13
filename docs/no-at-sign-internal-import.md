[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-at-sign-internal-import

# no-at-sign-internal-import

Disallows "@/**" import.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-at-sign-internal-import": "error"
  }
};
```

## Examples of incorrect code

```ts
import x from "@/folder";
```

## Examples of correct code

```ts
import x from "@";
```