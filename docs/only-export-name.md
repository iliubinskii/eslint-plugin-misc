[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / only-export-name

# only-export-name

Requires that only export matches filename.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/only-export-name": "error"
  }
};
```

## Examples of incorrect code

```ts
// filename: file.ts
export class SampleClass {}
```

## Examples of correct code

```ts
// filename: SampleClass.ts
export class SampleClass {}
```