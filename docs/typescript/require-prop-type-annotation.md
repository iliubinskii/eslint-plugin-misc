# typescript/require-prop-type-annotation

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / typescript/require-prop-type-annotation

Requires type annotation for class properties.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/require-prop-type-annotation": "error"
  }
};
```

## Examples of incorrect code

```ts
class C {
  x;
}
```

## Examples of correct code

```ts
class C {
  x: string;
  y = "";
}
```
