# consistent-import

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / consistent-import

Requires consistent import.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/consistent-import": [
      "error",
      {
        sources: [
          {
            _id: string,
            altLocalNames: string[],
            autoImport: boolean,
            autoImportSource: string,
            filesToLint: string[],
            filesToSkip: string[],
            localName: string,
            source: string,
            sourcePattern: string,
            wildcard: boolean
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
| `sources._id` | Id | `-` |
| `sources.altLocalNames` | Alternative local names | `[]` |
| `sources.autoImportSource` | Auto-import source (defaults to "source") | `-` |
| `sources.autoImport` | Enable auto-import | `false` |
| `sources.filesToLint` | Files to lint (minimatch patterns) | `[]` |
| `sources.filesToSkip` | Files to skip (minimatch patterns) | `[]` |
| `sources.localName` | Local name | `-` |
| `sources.sourcePattern` | Source pattern (minimatch) | `-` |
| `sources.source` | Source | `-` |
| `sources.wildcard` | Prefer wildcard import | `false` |

## Examples of incorrect code

```ts
/*
eslint misc/consistent-import: [
  error,
  {
    sources: [
      {
        _id: "catch-all",
        source: "**"
      },
      {
        _id: "source2",
        source: "source2",
        wildcard: true
      }
    ]
  }
]
*/
import * as source1 from "source1"; // Wildcard import disallowed
import { item1 } from "source2"; // Wildcard import required
import * as invalidLocalName from "source2"; // Invalid local name
```

## Examples of correct code

```ts
/*
eslint misc/consistent-import: [
  error,
  {
    sources: [
      {
        _id: "catch-all",
        source: "**"
      },
      {
        _id: "source2",
        source: "source2",
        wildcard: true
      }
    ]
  }
]
*/
import { item1 } from "source1";
import * as source2 from "source2";
```