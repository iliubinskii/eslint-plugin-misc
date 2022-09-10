[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / typescript/no-restricted-syntax

# typescript/no-restricted-syntax

Disallows restricted syntax.

```ts
type TypeGroup =
  | "any"
  | "array"
  | "boolean"
  | "complex"
  | "function"
  | "never"
  | "null"
  | "number"
  | "object"
  | "parameter"
  | "readonly"
  | "string"
  | "symbol"
  | "tuple"
  | "undefined"
  | "unknown";
```

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/typescript/no-restricted-syntax": [
      "error",
      {
        checkArrayType: boolean,
        checkReturnType: boolean,
        ignoreSelector: string | string[],
        message: string,
        replacement: string,
        search: string,
        selector: string | string[],
        typeHas: TypeGroup,
        typeHasNoneOf: TypeGroup[],
        typeHasOneOf: TypeGroup[],
        typeIs: TypeGroup,
        typeIsNoneOf: TypeGroup[],
        typeIsOneOf: TypeGroup[]
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| checkArrayType | Check array argument type | false|
| checkReturnType | Check function return type | false|
| ignoreSelector | Allowed AST elements (AST selectors) | []|
| message | Custom message | -|
| replacement | Replacement | -|
| search | Serch term for replacement (regular expression) | -|
| selector | Disallowed AST elements (AST selectors) | -|
| typeHas | Restrict syntax only if AST element's type includes given type | -|
| typeHasNoneOf | Restrict syntax only if AST element's type includes none of given types | -|
| typeHasOneOf | Restrict syntax only if AST element's type includes one of given types | -|
| typeIs | Restrict syntax only if AST element's type is equal to given type | -|
| typeIsNoneOf | Restrict syntax only if AST element's type is none of given types | -|
| typeIsOneOf | Restrict syntax only if AST element's type is one of given types | -|

## Examples of incorrect code

```ts
/*
eslint misc/no-restricted-syntax: [
  error,
  {
    selector: "Identifier",
    typeIs: "number"
  }
]
*/
const x = 1;
```

## Examples of correct code

```ts
/*
eslint misc/no-restricted-syntax: [
  error,
  {
    selector: "Identifier",
    typeIs: "number"
  }
]
*/
const x = "";
```