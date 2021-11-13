[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / sort-call-signature

# sort-call-signature

Requires call signature to be first child.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-call-signature": "error"
  }
};
```

## Examples of incorrect code

```ts
interface I {
  x: string;
  (): string;
}
```

## Examples of correct code

```ts
interface I {
  (): string;
  x: string;
}
```