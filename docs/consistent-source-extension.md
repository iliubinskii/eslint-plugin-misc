# consistent-source-extension

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / consistent-source-extension

Requires consistent import/export source extension.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/consistent-source-extension": "error"
  }
};
```

## Examples of incorrect code

```ts
import x1 from "source1.js";
import x2 from "source2.json";
import x3 from "source3.ts";
```

## Examples of correct code

```ts
import x1 from "source1";
import x2 from "source2";
import x3 from "source3";
```