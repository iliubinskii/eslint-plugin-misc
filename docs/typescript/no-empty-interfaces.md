# typescript/no-empty-interfaces

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / typescript/no-empty-interfaces

Disallow empty interfaces.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/no-empty-interfaces": "error"
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