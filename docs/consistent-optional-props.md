[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / consistent-optional-props

# consistent-optional-props

Ensures consistent optional property style:
- Combined syntax: "x?: T \| undefined"
- Only optional syntax: "x?: T"
- Only undefined syntax: "x: T \| undefined"

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/consistent-optional-props": [
      "error",
      {
        classes: "combined" | "optional" | "undefined",
        interfaces: "combined" | "optional" | "undefined",
        overrides: [
          {
            _id: string,
            pattern: string | string[],
            propertyPattern: string | string[],
            style: "combined" | "optional" | "undefined",
            target: "classes" | "interfaces"
          },
          ...
        ]
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
| classes | Prefered style for classes | "combined"|
| interfaces | Prefered style for interfaces | "combined"|
| overrides._id | Id | - |
| overrides.pattern | Only for selected class/interface names (regular expression) | [] |
| overrides.propertyPattern | Only for selected property names (regular expression) | [] |
| overrides.style | Prefered style | - |
| overrides.target | Classes or interfaces | - |

## Examples of incorrect code

```ts
interface I {
  x?: string;
  y: string | undefined;
}
```

## Examples of correct code

```ts
interface I {
  x?: string | undefined;
  y?: string | undefined;
}
```