# no-at-sign-internal-import

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-at-sign-internal-import

Disallows "@/**" import.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-at-sign-internal-import": "error"
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
