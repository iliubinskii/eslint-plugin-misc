[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / sort-construct-signature

# sort-construct-signature

Requires construct signature to be first child.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-construct-signature": "error"
  }
};
```

## Examples of incorrect code

```ts
interface I {
  x: string;
  new (): string;
}
```

## Examples of correct code

```ts
interface I {
  new (): string;
  x: string;
}
```