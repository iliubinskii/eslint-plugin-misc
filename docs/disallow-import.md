[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / disallow-import

# disallow-import

Disallows import given sources.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/disallow-import": [
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
| allow | Allowed sources (minimatch) | []|
| disallow | Disallowed sources (minimatch) | []|

## Examples of incorrect code

```ts
/*
eslint @skylib/disallow-import: [
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
eslint @skylib/disallow-import: [
  error,
  {
    disallow: "source1"
  }
]
*/
import * as source2 from "source2";
```