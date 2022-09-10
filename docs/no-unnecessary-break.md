[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / no-unnecessary-break

# no-unnecessary-break

Disallows unnecessary "break".

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-unnecessary-break": "error"
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