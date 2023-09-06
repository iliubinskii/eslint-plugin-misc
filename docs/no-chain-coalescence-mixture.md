# no-chain-coalescence-mixture

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-chain-coalescence-mixture

Disallows mixing of chain and coalescence operators.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-chain-coalescence-mixture": "error"
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
