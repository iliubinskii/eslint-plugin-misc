# switch-case-spacing

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / switch-case-spacing

Ensures consistent empty lines between switch case statements.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/switch-case-spacing": "error"
  }
};
```

## Examples of incorrect code

```ts
switch (x) {
  case 1:

  case 2:
    break;
  case 3:
}
```

## Examples of correct code

```ts
switch (x) {
  case 1:
  case 2:
    break;

  case 3:
}
```