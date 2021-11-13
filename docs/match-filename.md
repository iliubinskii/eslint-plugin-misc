[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / match-filename

# match-filename

Requires that AST element matches filename.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/match-filename": [
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
| :----- | :----- | :----- |
| format | Format | -|
| prefix | Prefix | ""|
| selector | AST selector | -|
| suffix | Suffix | ""|

## Examples of incorrect code

```ts
/*
eslint @skylib/match-filename: [
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
eslint @skylib/match-filename: [
  error,
  {
    disallow: "source1"
  }
]
*/
import * as source2 from "source2";
```