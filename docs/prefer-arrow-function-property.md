[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / prefer-arrow-function-property

# prefer-arrow-function-property

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
const x = { f: function () {} };
```

## Examples of correct code

```ts
const x = { f: () => {} };
```