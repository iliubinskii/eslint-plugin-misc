# consistent-enum-members

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / consistent-enum-members

Requires consistent key-value pairs inside enums (key should match value).

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/consistent-enum-members": [
      "error",
      {
        overrides: [
          {
            _id: string,
            filesToLint: string[],
            filesToSkip: string[],
            format: "PascalCase" | "camelCase" | "kebab-case",
            selector: string | string[]
          },
          ...
        ]
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| `overrides._id` | Id | `-` |
| `overrides.filesToLint` | Files to lint (minimatch patterns) | `[]` |
| `overrides.filesToSkip` | Files to skip (minimatch patterns) | `[]` |
| `overrides.format` | Overrides default file name format | `-` |
| `overrides.selector` | Triggers override when AST element matching AST selector is found | `-` |

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