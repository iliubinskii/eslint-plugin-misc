[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / sort-keys

# sort-keys

Sorts object keys.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-keys": [
      "error",
      {
        overrides: [
          {
            _id: string,
            customOrder: string[],
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
| :----- | :----- | :----- |
| overrides._id | Id | - |
| overrides.customOrder | Array elements with custom order | - |
| overrides.selector | AST elements to be sorted (AST selector) | - |
| overrides.sendToBottom | Array elements that should be sent to bottom | - |
| overrides.sendToTop | Array elements that should be sent to top | - |

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