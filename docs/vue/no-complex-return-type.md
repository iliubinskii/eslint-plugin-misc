[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / vue/no-complex-return-type

# vue/no-complex-return-type

Disallow complex function return types.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/vue/no-complex-return-type": "error"
  }
};
```

## Examples of incorrect code

```ts
function f() {
  return { x: 1 };
}
```

## Examples of correct code

```ts
function f(): object {
  return { x: 1 };
}

export default defineComponent({
  setup: () => ({ x: 1 })
});
```