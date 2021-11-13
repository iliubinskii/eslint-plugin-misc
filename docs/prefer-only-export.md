[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / prefer-only-export

# prefer-only-export

Requires only export if given AST element if found.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/prefer-only-export": [
      "error",
      {
        selector: string | string[]
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| selector | AST selector | []|

## Examples of incorrect code

```ts
/*
eslint @skylib/prefer-only-export: [
  error,
  {
    selector: "Program > ExportNamedDeclaration > ClassDeclaration"
  }
]
*/
export class SampleClass {}
export const x = 1;
```

## Examples of correct code

```ts
/*
eslint @skylib/prefer-only-export: [
  error,
  {
    selector: "Program > ExportNamedDeclaration > ClassDeclaration"
  }
]
*/
export class SampleClass {}
```