[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/prefer-array-type-alias

# typescript/prefer-array-type-alias

Disallows unsafe "Object.assign".

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/prefer-array-type-alias": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = { value: 1 } as const;

Object.assign(x, { value: 2 });
```

## Examples of correct code

```ts
const x = { value: 1 };

Object.assign(x, { value: 2 });
```