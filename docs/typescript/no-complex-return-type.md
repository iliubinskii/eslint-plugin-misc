[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/no-complex-return-type

# typescript/no-complex-return-type

Disallow complex function return types.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-complex-return-type": "error"
  }
};
```

## Examples of incorrect code

```ts
function f() {
  return { x: 1 };
}
```

## Examples of correct code

```ts
function f(): object {
  return { x: 1 };
}
```