[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / class-match-filename

# class-match-filename

Requires class name to match filename.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/class-match-filename": "error"
  }
};
```

## Examples of incorrect code

```ts
// filename: SomeName.ts
export class ClassName {}
```

## Examples of correct code

```ts
// filename: ClassName.ts
export class ClassName {}
```