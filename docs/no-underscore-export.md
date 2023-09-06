# no-underscore-export

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-underscore-export

Disallows underscore export.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-underscore-export": "error"
  }
};
```

## Examples of incorrect code

```ts
export const _x = 1;
export function _f() {}
```

## Examples of correct code

```ts
export const x = 1;
export function f() {}
```
