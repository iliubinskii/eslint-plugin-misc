# no-unnecessary-as-const

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-unnecessary-as-const

Disallows unnecessary "as const".

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-unnecessary-as-const": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = {} as const;
const y: I = { value: 1 } as const;
```

## Examples of correct code

```ts
const x = { value: 1 } as const;
```
