# vue/no-readonly-v-model

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / vue/no-readonly-v-model

Disallows using readonly property as model value.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/vue/no-readonly-v-model": "error"
  }
};
```

## Examples of incorrect code

```ts
<script lang="ts">
export default defineComponent({
  setup: () => {
    const obj: SampleInterface = { x: 1 };

    return { obj };

    interface SampleInterface {
      readonly x: unknown;
    }
  }
});
</script>

<template>
  <sample-component v-model="obj.x" />
</template>
```

## Examples of correct code

```ts
<script lang="ts">
export default defineComponent({
  setup: () => {
    const obj: SampleInterface = { x: 1 };

    return { obj };

    interface SampleInterface {
      x: unknown;
    }
  }
});
</script>

<template>
  <sample-component v-model="obj.x" />
</template>
```
