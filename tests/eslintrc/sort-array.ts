import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["eslintrc/sort-array"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-array", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        overrides: [
          {
            files: ["./b", "./a"]
          }
        ]
      };
    `,
    output: `
      module.exports = {
        overrides: [
          {
            files: ["./a", "./b"]
          }
        ]
      };
    `,
    errors: [{ line: 4, messageId: MessageId.incorrectSortingOrder }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: [
          {
            "misc/rule": [
              "warn",
              {
                allow: ["b", "a"],
                disallow: ["b", "a"],
                excludeSelectors: ["b", "a"],
                ignoreSelector: ["b", "a"],
                includeSelectors: ["b", "a"],
                pattern: ["b", "a"],
                propertyPattern: ["b", "a"],
                selector: ["b", "a"]
              }
            ]
          }
        ]
      };
    `,
    output: `
      module.exports = {
        rules: [
          {
            "misc/rule": [
              "warn",
              {
                allow: ["a", "b"],
                disallow: ["a", "b"],
                excludeSelectors: ["a", "b"],
                ignoreSelector: ["a", "b"],
                includeSelectors: ["a", "b"],
                pattern: ["a", "b"],
                propertyPattern: ["a", "b"],
                selector: ["a", "b"]
              }
            ]
          }
        ]
      };
    `,
    errors: [
      { line: 7, messageId: MessageId.incorrectSortingOrder },
      { line: 8, messageId: MessageId.incorrectSortingOrder },
      { line: 9, messageId: MessageId.incorrectSortingOrder },
      { line: 10, messageId: MessageId.incorrectSortingOrder },
      { line: 11, messageId: MessageId.incorrectSortingOrder },
      { line: 12, messageId: MessageId.incorrectSortingOrder },
      { line: 13, messageId: MessageId.incorrectSortingOrder },
      { line: 14, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: [
          {
            "misc/rule": [
              "warn",
              {
                rules: [
                  {
                    allow: ["b", "a"],
                    disallow: ["b", "a"],
                    excludeSelectors: ["b", "a"],
                    ignoreSelector: ["b", "a"],
                    includeSelectors: ["b", "a"],
                    pattern: ["b", "a"],
                    propertyPattern: ["b", "a"],
                    selector: ["b", "a"]
                  }
                ]
              }
            ]
          }
        ]
      };
    `,
    output: `
      module.exports = {
        rules: [
          {
            "misc/rule": [
              "warn",
              {
                rules: [
                  {
                    allow: ["a", "b"],
                    disallow: ["a", "b"],
                    excludeSelectors: ["a", "b"],
                    ignoreSelector: ["a", "b"],
                    includeSelectors: ["a", "b"],
                    pattern: ["a", "b"],
                    propertyPattern: ["a", "b"],
                    selector: ["a", "b"]
                  }
                ]
              }
            ]
          }
        ]
      };
    `,
    errors: [
      { line: 9, messageId: MessageId.incorrectSortingOrder },
      { line: 10, messageId: MessageId.incorrectSortingOrder },
      { line: 11, messageId: MessageId.incorrectSortingOrder },
      { line: 12, messageId: MessageId.incorrectSortingOrder },
      { line: 13, messageId: MessageId.incorrectSortingOrder },
      { line: 14, messageId: MessageId.incorrectSortingOrder },
      { line: 15, messageId: MessageId.incorrectSortingOrder },
      { line: 16, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: [
          {
            "misc/rule": [
              "warn",
              {
                rules: [
                  {
                    hierarchy: [["./b", "./a"]]
                  }
                ]
              }
            ]
          }
        ]
      };
    `,
    output: `
      module.exports = {
        rules: [
          {
            "misc/rule": [
              "warn",
              {
                rules: [
                  {
                    hierarchy: [["./a", "./b"]]
                  }
                ]
              }
            ]
          }
        ]
      };
    `,
    errors: [{ line: 9, messageId: MessageId.incorrectSortingOrder }]
  }
]);
