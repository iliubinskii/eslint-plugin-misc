# no-at-sign-import

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-at-sign-import

Disallows "@" import.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-at-sign-import": "error"
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
