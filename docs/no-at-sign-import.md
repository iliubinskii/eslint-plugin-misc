[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-at-sign-import

# no-at-sign-import

Disallows "@" import.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-at-sign-import": "error"
  }
};
```

## Examples of incorrect code

```ts
import x from "@";
```

## Examples of correct code

```ts
import x from "@/folder";
```