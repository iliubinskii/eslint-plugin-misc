[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-unnecessary-as-const

# no-unnecessary-as-const

Disallows unnecessary "as const".

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-unnecessary-as-const": "error"
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