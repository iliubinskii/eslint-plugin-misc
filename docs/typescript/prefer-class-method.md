# typescript/prefer-class-method

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/prefer-class-method

Requires use of class methods instead of function properties.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/prefer-class-method": "error"
  }
};
```

## Examples of incorrect code

```ts
class SampleClass {
  static f = () => {};
  g = () => {};
}
```

## Examples of correct code

```ts
class SampleClass1 {
  static f: F = () => {};
  g: G = () => {};
}

class SampleClass2 {
  static f() {}
  g() {}
}
```