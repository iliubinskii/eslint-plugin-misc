[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / typescript/no-inferrable-types

# typescript/no-inferrable-types

Reports inferrable types.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/typescript/no-inferrable-types": "error"
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