[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / no-restricted-syntax

# no-restricted-syntax

Disallows AST syntax (an extended version of ESLint core rule).

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/no-restricted-syntax": [
      "error",
      {
        ignoreSelector: string | string[],
        message: string,
        replacement: string,
        search: string,
        selector: string | string[]
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| `ignoreSelector` | Allowed AST elements (AST selectors) | `[]` |
| `message` | Custom message | `-` |
| `replacement` | Replacement | `-` |
| `search` | Serch term for replacement (regular expression) | `-` |
| `selector` | Disallowed AST elements (AST selectors) | `-` |

## Examples of incorrect code

```ts
/*
eslint misc/no-restricted-syntax: [
  error,
  {
    selector: "Identifier",
    ignoreSelector: "Identifier[name=y]",
  }
]
*/
const x = 1;
```

## Examples of correct code

```ts
/*
eslint misc/no-restricted-syntax: [
  error,
  {
    selector: "Identifier",
    ignoreSelector: "Identifier[name=y]",
  }
]
*/
const y = 1;
```