# eslintrc/sort-suboptions

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / eslintrc/sort-suboptions

Sorts safely sortable arrays in eslint configuration files.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/eslintrc/sort-suboptions": "error"
  }
};
```

## Examples of incorrect code

```ts
module.exports = {
  rules: {
    "misc/sort-keys": [
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
    "misc/sort-keys": [
      "warn",
      {
        overrides: [{ _id: "a" }, { _id: "b" }]
      }
    ]
  }
};
```
