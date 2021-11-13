[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / vue/element-contents-spacing

# vue/element-contents-spacing

Controls spaces around HTML element contents.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/vue/element-contents-spacing": "error"
  }
};
```

## Examples of incorrect code

```ts
<template>
  <p> single-line contents </p>
</template>
```

## Examples of correct code

```ts
<template>
  <p>single-line contents</p>
  <p>
    multiline contents
    multiline contents
  </p>
</template>
```