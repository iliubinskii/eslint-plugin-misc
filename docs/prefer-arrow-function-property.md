# prefer-arrow-function-property

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / prefer-arrow-function-property

Requires use of arrow functions.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/prefer-arrow-function-property": "error"
  }
};
```

## Examples of incorrect code

```ts
const x = {
  f() {},
  g: function () {}
};
```

## Examples of correct code

```ts
const x = {
  f: () => {},
  g(this: void) {},
  h: function (this: void) {}
};
```
