[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-index-import

# no-index-import

Disallows "." import.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-index-import": "error"
  }
};
```

## Examples of incorrect code

```ts
import x from ".";
```

## Examples of correct code

```ts
import x from "./folder";
```