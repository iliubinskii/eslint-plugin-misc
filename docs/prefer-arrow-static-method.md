[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / prefer-arrow-static-method

# prefer-arrow-static-method

Requires use of arrow static methods.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/prefer-arrow-static-method": "error"
  }
};
```

## Examples of incorrect code

```ts
class C { static f() {} }
```

## Examples of correct code

```ts
class C { static f = () => {}; }
```