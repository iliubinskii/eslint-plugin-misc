[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / wrap

# wrap

Wraps third-party rule.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/wrap": [
      "error",
      {
        lint: string | string[],
        plugin: string,
        rule: string,
        skip: string | string[]
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| lint | AST selectors to lint | []|
| plugin | NPM package name | -|
| rule | ESLint rule name | -|
| skip | AST selectors to skip | []|

## Examples of incorrect code

```ts
/*
eslint @skylib/wrap: [
  error,
  {
    plugin: "@typescript-eslint/eslint-plugin",
    rule: "no-shadow"
  }
]
*/
const value = 1;
enum SampleEnum { value = "value" }
```

## Examples of correct code

```ts
/*
eslint @skylib/wrap: [
  error,
  {
    skip: "TSEnumDeclaration *",
    plugin: "@typescript-eslint/eslint-plugin",
    rule: "no-shadow"
  }
]
*/
const value = 1;
enum SampleEnum { value = "value" }
```