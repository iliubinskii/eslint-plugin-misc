[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/define-function-in-one-statement

# typescript/define-function-in-one-statement

Requires that function is defined in one statement.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/define-function-in-one-statement": "error"
  }
};
```

## Examples of incorrect code

```ts
function f() {}
f.x = 1;
```

## Examples of correct code

```ts
const f = Object.assign(() => {}, { x: 1 });
```