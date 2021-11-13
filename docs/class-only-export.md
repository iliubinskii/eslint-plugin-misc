[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / class-only-export

# class-only-export

Requires class to be the only export.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/class-only-export": "error"
  }
};
```

## Examples of incorrect code

```ts
export class SampleClass {}
export const x = 1;
```

## Examples of correct code

```ts
export class SampleClass {}
```