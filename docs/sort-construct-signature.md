# sort-construct-signature

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / sort-construct-signature

Requires construct signature to be first child.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/sort-construct-signature": "error"
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
