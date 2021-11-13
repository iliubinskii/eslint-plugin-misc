[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / vue/no-empty-lines

# vue/no-empty-lines

Disallow empty lines inside <template> section.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/vue/no-empty-lines": "error"
  }
};
```

## Examples of incorrect code

```ts
<template>
  <p></p>

  <p></p>
</template>
```

## Examples of correct code

```ts
<template>
  <p></p>
  text

  text
  <p></p>
</template>
```