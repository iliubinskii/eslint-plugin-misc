# consistent-enum-members

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / consistent-enum-members

Requires consistent key-value pairs inside enums (key should match value).

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/consistent-enum-members": "error"
  }
};
```

## Examples of incorrect code

```ts
enum Enum {
  a = "b"
}
```

## Examples of correct code

```ts
enum Enum {
  a = "a"
}
```