[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/require-prop-type-annotation

# typescript/require-prop-type-annotation

Requires type annotation for class properties.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/require-prop-type-annotation": "error"
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