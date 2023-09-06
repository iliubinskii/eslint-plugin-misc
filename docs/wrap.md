# wrap

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / wrap

Wraps and modifies third-party rule.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/wrap": [
      "error",
      {
        disableFix: boolean,
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
| `disableFix` | Disables fix | `false` |
| `lint` | AST selectors to lint | `[]` |
| `plugin` | NPM package name | `-` |
| `rule` | ESLint rule name | `-` |
| `skip` | AST selectors to skip | `[]` |

## Examples of incorrect code

```ts
/*
eslint misc/wrap: [
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
eslint misc/wrap: [
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
