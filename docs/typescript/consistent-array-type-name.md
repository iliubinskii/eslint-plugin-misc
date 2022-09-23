# typescript/consistent-array-type-name

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/consistent-array-type-name

## Overview

Requires consistent array type name.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/consistent-array-type-name": "error"
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