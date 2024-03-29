# typescript/no-unsafe-object-assignment

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / typescript/no-unsafe-object-assignment

Reports unsafe object assignments:
- Unsafe optional assignment
- Unsafe readonly-to-mutable assignment

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/no-unsafe-object-assignment": "error"
  }
};
```

## Examples of incorrect code

```ts
interface ReadonlyObject { readonly value: number; }
interface WritableObject { value: number; }

const x: ReadonlyObject = { value: 1 };

function f(x: WritableObject) {}

f(x);
```

## Examples of correct code

```ts
interface ReadonlyObject { readonly value: number; }
interface WritableObject { value: number; }

const x: WritableObject = { value: 1 };

function f(x: ReadonlyObject) {}

f(x);
```
