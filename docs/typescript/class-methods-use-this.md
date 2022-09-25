# typescript/class-methods-use-this

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/class-methods-use-this

This rule wraps "class-methods-use-this" core rule, but skips methods with "this: void" argument.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/class-methods-use-this": "error"
  }
};
```

## Examples of incorrect code

```ts
class SampleClass {
  f() {}
}
```

## Examples of correct code

```ts
class SampleClass {
  f(this: void) {}
}
```