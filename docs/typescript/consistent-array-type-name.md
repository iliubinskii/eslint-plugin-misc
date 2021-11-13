[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/consistent-array-type-name

# typescript/consistent-array-type-name

Requires consistent array type name.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/consistent-array-type-name": "error"
  }
};
```

## Examples of incorrect code

```ts
type Cat = string[];
type Progress = string[];
```

## Examples of correct code

```ts
type Cats = string[];
type CatArray = string[];
type Progresses = string[];
type ProgressArray = string[];
```