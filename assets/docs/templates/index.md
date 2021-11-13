# ESLint plugin

## Table of contents

- [Installation](#installation)
- [Rules](#rules)
- [Shared options](#shared-options)

## <a name="installation"></a>Installation

```
npm install --save-dev @skylib/eslint-plugin
```

## <a name="rules"></a>Rules

{{rules}}

## <a name="shared-options"></a>Shared options

### eslintrc.js

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/<rule-id>": [
      "error",
      {
        <sub-options-key>: [
          {
            filesToLint?: string[],
            filesToSkip?: string[],
            ...
          }
        ]
      }
    ]
  }
}
```

| Option | Description | Default |
| :----- | :----- | :----- |
| `filesToLint` | Files to lint (minimatch patterns) | [] |
| `filesToSkip` | Files to skip (minimatch patterns) | [] |
