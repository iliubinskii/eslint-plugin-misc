# vue/no-readonly-v-model

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / vue/no-readonly-v-model

## Overview

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
    const obj: SampleInterface = { value: 1 };

    return { obj };

    interface SampleInterface {
      readonly value: unknown;
    }
  }
});
</script>

<template>
  <sample-component v-model="obj.value" />
</template>
```

## Examples of correct code

```ts
<script lang="ts">
export default defineComponent({
  setup: () => {
    const obj: SampleInterface = { value: 1 };

    return { obj };

    interface SampleInterface {
      value: unknown;
    }
  }
});
</script>

<template>
  <sample-component v-model="obj.value" />
</template>
```