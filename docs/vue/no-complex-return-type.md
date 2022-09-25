# vue/no-complex-return-type

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / vue/no-complex-return-type

Disallow complex function return types.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/vue/no-complex-return-type": "error"
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