[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / no-sibling-import

# no-sibling-import

Restricts importing siblings.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/no-sibling-import": [
      "error",
      {
        rules: [
          {
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
| rules.hierarchy | Allows some sibling dependencies | [] |

## Examples of incorrect code

```ts
// filename: file.ts
import { x } from "./sibling-file";
```

## Examples of correct code

```ts
// filename: file.ts
/*
eslint @skylib/no-sibling-import: [
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