# vue/element-contents-spacing

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / vue/element-contents-spacing

Controls spaces around HTML element contents.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/vue/element-contents-spacing": "error"
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