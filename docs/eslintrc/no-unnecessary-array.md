[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / eslintrc/no-unnecessary-array

# eslintrc/no-unnecessary-array

Disallows unnessecary single-element arrays in eslint configuration files.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/eslintrc/no-unnecessary-array": "error"
  }
};
```

## Examples of incorrect code

```ts
module.exports = {
  overrides: [
    {
      files: ["./a"]
    }
  ]
};
```

## Examples of correct code

```ts
module.exports = {
  overrides: [
    {
      files: "./a"
    },
    {
      files: ["./a", "./b"]
    }
  ]
};
```