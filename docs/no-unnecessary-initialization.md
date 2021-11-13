[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-unnecessary-initialization

# no-unnecessary-initialization

Disallows unnecessary initialization.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-unnecessary-initialization": "error"
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