[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / switch-case-spacing

# switch-case-spacing

Ensures consistent empty lines between switch case statements.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/switch-case-spacing": "error"
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