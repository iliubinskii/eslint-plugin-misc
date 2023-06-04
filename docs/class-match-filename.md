# class-match-filename

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / class-match-filename

Requires class name to match filename.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/class-match-filename": "error"
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