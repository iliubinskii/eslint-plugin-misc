[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-unnecessary-break

# no-unnecessary-break

Disallows unnecessary "break".

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-unnecessary-break": "error"
  }
};
```

## Examples of incorrect code

```ts
switch (x) {
  case 1:
    break;

  case 2:
    break;
}
```

## Examples of correct code

```ts
switch (x) {
  case 1:
    break;

  case 2:
}
```