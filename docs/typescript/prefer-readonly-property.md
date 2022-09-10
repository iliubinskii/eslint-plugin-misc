[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/prefer-readonly-property

# typescript/prefer-readonly-property

Disallows writable properties.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/prefer-readonly-property": "error"
  }
};
```

## Examples of incorrect code

```ts
class C {
  x: string;
}
```

## Examples of correct code

```ts
class C {
  readonly x: string;
}
```