[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / jest/no-toThrow-literal

# jest/no-toThrow-literal

Disallows string argument in "toThrow" matcher.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/jest/no-toThrow-literal": "error"
  }
};
```

## Examples of incorrect code

```ts
expect(f).toThrow("Error message");
```

## Examples of correct code

```ts
expect(f).toThrow(new Error("Error message"));
```