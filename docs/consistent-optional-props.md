# consistent-optional-props

[ESLint plugin](https://ilyub.github.io/eslint-plugin-misc/) / consistent-optional-props

Ensures consistent optional property style:
- Combined syntax: "x?: T \| undefined"
- Only optional syntax: "x?: T"
- Only undefined syntax: "x: T \| undefined"

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/consistent-optional-props": [
      "error",
      {
        classes: "combined" | "optional" | "undefined",
        interfaces: "combined" | "optional" | "undefined",
        overrides: [
          {
            _id: string,
            filesToLint: string[],
            filesToSkip: string[],
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
| `classes` | Prefered style for classes | `"undefined"` |
| `interfaces` | Prefered style for interfaces | `"optional"` |
| `overrides._id` | Id | `-` |
| `overrides.filesToLint` | Files to lint (minimatch patterns) | `[]` |
| `overrides.filesToSkip` | Files to skip (minimatch patterns) | `[]` |
| `overrides.pattern` | Only for selected class/interface names (regular expression) | `[]` |
| `overrides.propertyPattern` | Only for selected property names (regular expression) | `[]` |
| `overrides.style` | Prefered style | `-` |
| `overrides.target` | Classes or interfaces | `-` |

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