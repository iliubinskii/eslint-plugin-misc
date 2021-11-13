[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / require-jsdoc

# require-jsdoc

Requires JSDoc documentation.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/require-jsdoc": [
      "error",
      {
        excludeSelectors: string[],
        includeSelectors: string[],
        interfaces: "callSignatures" | "constructSignatures" | "interface",
        noDefaultSelectors: boolean,
        properties: Array<"function" | "nonFunction">
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| excludeSelectors | Skip these selectors | []|
| includeSelectors | Check additional selectors | []|
| interfaces | Require documenation for interface ("interface"), call signatures ("callSignatures"), construct signatures ("constructSignatures") | ['callSignatures','constructSignatures','interface']|
| noDefaultSelectors | Do not check default selectors | false|
| properties | Require documenation for function properties ("function"), non-function properties ("nonFunction") | ['function','nonFunction']|

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