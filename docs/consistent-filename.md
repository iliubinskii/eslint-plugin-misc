# consistent-filename

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / consistent-filename

Enforces consistent file name format.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/consistent-filename": [
      "error",
      {
        format: "PascalCase" | "camelCase" | "kebab-case",
        overrides: [
          {
            _id: string,
            filesToLint: string[],
            filesToSkip: string[],
            format: "PascalCase" | "camelCase" | "kebab-case",
            match: boolean,
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
| :----- | :---------- | :------ |

| `format` | Default file name format | `"kebab-case"` |
| `overrides._id` | Id | `-` |
| `overrides.filesToLint` | Files to lint (minimatch patterns) | `[]` |
| `overrides.filesToSkip` | Files to skip (minimatch patterns) | `[]` |
| `overrides.format` | Overrides default file name format | `-` |
| `overrides.match` | Apply override only if AST element's text matches file name | `false` |
| `overrides.selector` | Triggers override when AST element matching AST selector is found | `-` |

## Examples of incorrect code

```ts
// filename: SampleClass.ts
/*
eslint misc/consistent-filename: [
  error,
  {
    overrides: [
      {
        _id: "class",
        format: "kebab-case",

        match: true,
        selector: "ClassDeclaration > Identifier.id"
      }
    ]
  }
]
*/
class SampleClass {}
```

## Examples of correct code

```ts
// filename: SampleClass.ts
/*
eslint misc/consistent-filename: [
  error,
  {
    overrides: [
      {
        _id: "class",
        format: "PascalCase",
        match: true,
        selector: "ClassDeclaration > Identifier.id"
      }
    ]
  }
]
*/
class SampleClass {}
```
