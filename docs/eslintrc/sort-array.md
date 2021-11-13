[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / eslintrc/sort-array

# eslintrc/sort-array

Sorts safely sortable arrays in eslint configuration files.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/eslintrc/sort-array": "error"
  }
};
```

## Examples of incorrect code

```ts
module.exports = {
  overrides: [
    {
      files: ["./b", "./a"]
    }
  ]
};
```

## Examples of correct code

```ts
module.exports = {
  overrides: [
    {
      files: ["./a", "./b"]
    }
  ]
};
```