[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / vue/sort-v-bind

# vue/sort-v-bind

Sorts "v-bind" directive.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/vue/sort-v-bind": "error"
  }
};
```

## Examples of incorrect code

```ts
<template>
  <slot v-bind="obj" prop="prop" @click="click"></slot>
</template>
```

## Examples of correct code

```ts
<template>
  <slot prop="prop" v-bind="obj" @click="click"></slot>
</template>
```