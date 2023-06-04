# typescript/define-function-in-one-statement

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / typescript/define-function-in-one-statement

Requires that function is defined in one statement.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/define-function-in-one-statement": "error"
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