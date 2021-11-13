[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / eslintrc/sort-suboptions

# eslintrc/sort-suboptions

Sorts safely sortable arrays in eslint configuration files.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/eslintrc/sort-suboptions": "error"
  }
};
```

## Examples of incorrect code

```ts
module.exports = {
  rules: {
    "@skylib/sort-keys": [
      "warn",
      {
        overrides: [{ _id: "b" }, { _id: "a" }]
      }
    ]
  }
};
```

## Examples of correct code

```ts
module.exports = {
  rules: {
    "@skylib/sort-keys": [
      "warn",
      {
        overrides: [{ _id: "a" }, { _id: "b" }]
      }
    ]
  }
};
```