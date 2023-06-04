# eslintrc/sort-array

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / eslintrc/sort-array

Sorts safely sortable arrays in eslint configuration files.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/eslintrc/sort-array": "error"
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