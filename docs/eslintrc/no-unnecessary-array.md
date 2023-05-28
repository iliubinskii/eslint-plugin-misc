# eslintrc/no-unnecessary-array

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / eslintrc/no-unnecessary-array

Disallows unnecessary single-element arrays in eslint configuration files.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/eslintrc/no-unnecessary-array": "error"
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