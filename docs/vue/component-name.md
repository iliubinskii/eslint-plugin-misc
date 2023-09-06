# vue/component-name

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / vue/component-name

Requires using enums instead of string literals.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/vue/component-name": "error"
  }
};
```

## Examples of incorrect code

```ts
<!-- filename: SampleComponent.vue -->
<script lang="ts">
  export default defineComponent({ name: "invalid-name" });
</script>
```

## Examples of correct code

```ts
<!-- filename: SampleComponent.vue -->
<script lang="ts">
  export default defineComponent({ name: "sample-component" });
</script>
```
