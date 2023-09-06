# no-unnecessary-initialization

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-unnecessary-initialization

Disallows unnecessary initialization.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-unnecessary-initialization": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = undefined;

class C {
  x = undefined;
}
```

## Examples of correct code

```ts
const x = 1;

class C {
  x = 1;
}
```
