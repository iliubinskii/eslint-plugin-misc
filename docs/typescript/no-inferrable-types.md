# typescript/no-inferrable-types

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/no-inferrable-types

Reports inferrable types.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/no-inferrable-types": "error"
  }
};
```

## Examples of incorrect code

```ts
function f<T>() {
  const x: T = {} as T;
}
```

## Examples of correct code

```ts
function f<T>() {
  const x = {} as T;
}
```