# match-filename

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / match-filename

Requires that AST element matches filename.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/match-filename": [
      "error",
      {
        format: "camelCase" | "kebab-case" | "PascalCase",
        prefix: string,
        selector: string | string[],
        suffix: string
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :---------- | :------ |

| `format` | Format | `-` |
| `prefix` | Prefix | `""` |
| `selector` | AST selector | `-` |
| `suffix` | Suffix | `""` |

## Examples of incorrect code

```ts
/*
eslint misc/match-filename: [
  error,
  {
    disallow: "source1"
  }
]
*/
import * as source1 from "source1";
```

## Examples of correct code

```ts
/*
eslint misc/match-filename: [
  error,
  {
    disallow: "source1"
  }
]
*/
import * as source2 from "source2";
```
