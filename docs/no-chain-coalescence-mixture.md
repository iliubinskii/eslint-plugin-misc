[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-chain-coalescence-mixture

# no-chain-coalescence-mixture

Disallows mixing of chain and coalescence operators.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-chain-coalescence-mixture": "error"
  }
};
```

## Examples of incorrect code

```ts
x?.y ?? z;
```

## Examples of correct code

```ts
x?.y;
x ?? y;
```