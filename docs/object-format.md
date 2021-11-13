[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / object-format

# object-format

Requires multiline or single-line object format.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/object-format": [
      "error",
      {
        maxLineLength: number,
        maxObjectSize: number
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| maxLineLength | Max line length for single-line object | 75|
| maxObjectSize | Max object size for single-line object | 3|

## Examples of incorrect code

```ts
const obj1 = {
  a: 1,
  b: 2,
  c: 3
};
const obj2 = { a: 1, b: 2, c: 3, d: 4 };
```

## Examples of correct code

```ts
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
};
```