# consistent-empty-lines

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / consistent-empty-lines

Requires consistent empty lines.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/consistent-empty-lines": [
      "error",
      {
        rules: [
          {
            _id: string,
            emptyLine: "always" | "any" | "never",
            filesToLint: string[],
            filesToSkip: string[],
            next: string | string[],
            prev: string | string[],
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
| `rules._id` | Id | `-` |
| `rules.emptyLine` | Requires or disallows empty line | `-` |
| `rules.filesToLint` | Files to lint (minimatch patterns) | `[]` |
| `rules.filesToSkip` | Files to skip (minimatch patterns) | `[]` |
| `rules.next` | The second of the two adjacent AST elements (AST selectors) | `-` |
| `rules.prev` | The first of the two adjacent AST elements (AST selectors) | `-` |
| `rules.selector` | One selector for both adjacent AST elements (AST selectors) | `-` |

## Examples of incorrect code

```ts
/*
eslint misc/consistent-empty-lines: [
  error,
  {
    rules: [
      {
        _id: "import",
        emptyLine: "always",
        selector: "ImportDeclaration"
      }
    ]
  }
]
*/
import x from "source1";
import y from "source2";
```

## Examples of correct code

```ts
/*
eslint misc/consistent-empty-lines: [
  error,
  {
    rules: [
      {
        _id: "import",
        emptyLine: "never",
        selector: "ImportDeclaration"
      }
    ]
  }
]
*/
import x from "source1";
import y from "source2";
```