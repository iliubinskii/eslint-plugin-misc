# sort-keys

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / sort-keys

Sorts object keys.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/sort-keys": [
      "error",
      {
        overrides: [
          {
            _id: string,
            customOrder: string[],
            filesToLint: string[],
            filesToSkip: string[],
            selector: string | string[],
            sendToBottom: string,
            sendToTop: string
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

| `overrides._id` | Id | `-` |
| `overrides.customOrder` | Array elements with custom order | `-` |
| `overrides.filesToLint` | Files to lint (minimatch patterns) | `[]` |
| `overrides.filesToSkip` | Files to skip (minimatch patterns) | `[]` |
| `overrides.selector` | AST elements to be sorted (AST selector) | `-` |
| `overrides.sendToBottom` | Array elements that should be sent to bottom | `-` |
| `overrides.sendToTop` | Array elements that should be sent to top | `-` |

## Examples of incorrect code

```ts
export default {
  b: 1,
  a: 2
}
```

## Examples of correct code

```ts
export default {
  a: 1,
  b: 2
}
```
