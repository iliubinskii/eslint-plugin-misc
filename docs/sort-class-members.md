[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / sort-class-members

# sort-class-members

Sorts class members by type and alphabetically inside each type group. Type groups:
- Accessibility: "private", "protected", "public"
- Accessor type: "get", "set"
- Dynamic/static members: "dynamic", "static"
- Type: "accessor", "block", "constructor", "field", "get", "method", "set", "signature"
- Any combinations, e.g.: "protected-dynamic-accessor"

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-class-members": [
      "error",
      {
        sortingOrder: string[]
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| sortingOrder | Sorting order | []|

## Examples of incorrect code

```ts
class SampleClass {
  z;
  y;
  x;
}
```

## Examples of correct code

```ts
class SampleClass {
  x;
  y;
  z;
}
```