# typescript/no-complex-declarator-type

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/no-complex-declarator-type

Disallow complex declarator types.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/no-complex-declarator-type": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = { value: 1 };
```

## Examples of correct code

```ts
const x = { value: 1 } as const;

const y: object = { value: 1 };
```