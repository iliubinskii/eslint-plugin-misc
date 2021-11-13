[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-internal-modules

# no-internal-modules

Disallows importing of internal modules.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-internal-modules": "error"
  }
};
```

## Examples of incorrect code

```ts
import "./folder/internal";
import "package/internal";
import "@scope/package/internal";
```

## Examples of correct code

```ts
import "./folder";
import "package";
import "@scope/package";
```