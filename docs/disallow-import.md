# disallow-import

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / disallow-import

## Overview

Disallows import given sources.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/disallow-import": [
      "error",
      {
        allow: string | string[],
        disallow: string | string[]
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| `allow` | Allowed sources (minimatch) | `[]` |
| `disallow` | Disallowed sources (minimatch) | `[]` |

## Examples of incorrect code

```ts
/*
eslint misc/disallow-import: [
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
eslint misc/disallow-import: [
  error,
  {
    disallow: "source1"
  }
]
*/
import * as source2 from "source2";
```