# typescript/require-this-void

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / typescript/require-this-void

Requires "this: void" for static methods.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/require-this-void": "error"
  }
};
```

## Examples of incorrect code

```ts
class C {
  static f() {}
}
```

## Examples of correct code

```ts
class C {
  static f(this: void) {}
}
```
