# require-jsdoc

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / require-jsdoc

## Overview

Requires JSDoc documentation.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/require-jsdoc": [
      "error",
      {
        excludeSelectors: string[],
        includeSelectors: string[],
        interfaces: "callSignatures" | "constructSignatures" | "interface",
        noDefaultSelectors: boolean
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| `excludeSelectors` | Skip these selectors | `[]` |
| `includeSelectors` | Check additional selectors | `[]` |
| `interfaces` | Require documenation for interface ("interface"), call signatures ("callSignatures"), construct signatures ("constructSignatures") | `['callSignatures','constructSignatures']` |
| `noDefaultSelectors` | Do not check default selectors | `false` |

## Examples of incorrect code

```ts
function f(): void {}
```

## Examples of correct code

```ts
/**
 * Description.
 */
function f(): void {}
```