[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/no-boolean-literal-type

# typescript/no-boolean-literal-type

Disallows boolean literal type.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-boolean-literal-type": "error"
  }
};
```

## Examples of incorrect code

```ts
interface I {
  x?: true;
  y?: false;
}
```

## Examples of correct code

```ts
interface I {
  x?: boolean;
}
```