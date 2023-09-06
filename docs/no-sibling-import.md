# no-sibling-import

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / no-sibling-import

Restricts importing siblings.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-sibling-import": [
      "error",
      {
        rules: [
          {
            _id: string,
            filesToLint: string[],
            filesToSkip: string[],
            hierarchy: string[][]
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
| `rules.filesToLint` | Files to lint (minimatch patterns) | `[]` |
| `rules.filesToSkip` | Files to skip (minimatch patterns) | `[]` |
| `rules.hierarchy` | Allows some sibling dependencies | `[]` |

## Examples of incorrect code

```ts
// filename: file.ts
import { x } from "./sibling-file";
```

## Examples of correct code

```ts
// filename: file.ts
/*
eslint misc/no-sibling-import: [
  error,
  {
    rules: [
      {
        hierarchy: [["./sibling-file"], ["./file"]]
      }
    ]
  }
]
*/
import { x } from "./sibling-file";
import { y } from "./folder";
```
