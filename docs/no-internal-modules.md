# no-internal-modules

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-internal-modules

Disallows importing of internal modules.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-internal-modules": "error"
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
