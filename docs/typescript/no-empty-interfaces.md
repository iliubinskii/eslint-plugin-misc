[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/no-empty-interfaces

# typescript/no-empty-interfaces

Disallow empty interfaces.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-empty-interfaces": "error"
  }
};
```

## Examples of incorrect code

```ts
interface I {}
```

## Examples of correct code

```ts
interface I {
  x: string;
}
```