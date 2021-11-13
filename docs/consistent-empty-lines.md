[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / consistent-empty-lines

# consistent-empty-lines

Requires consistent empty lines.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-empty-lines": [
      "error",
      {
        rules: [
          {
            _id: string,
            emptyLine: "always" | "any" | "never",
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
| rules._id | Id | - |
| rules.emptyLine | Requires or disallows empty line | - |
| rules.next | The second of the two adjustent AST selector (AST selector) | - |
| rules.prev | The first of the two adjustent AST elements (AST selector) | - |
| rules.selector | One selector for both adjustent AST elements (AST selector) | - |

## Examples of incorrect code

```ts
/*
eslint @skylib/consistent-empty-lines: [
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
eslint @skylib/consistent-empty-lines: [
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