import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["eslintrc/no-unnecessary-array"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unnecessary-array", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        extends: ["a"]
      };
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        overrides: [
          {
            files: ["./a"],
            extends: ["a"]
          },
          {
            files: ["./a", "./b"],
            extends: ["a", "b"]
          }
        ]
      };
    `,
    errors: [
      { line: 4, messageId: MessageId.customMessage },
      { line: 5, messageId: MessageId.customMessage }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: [
          {
            "misc/rule1": ["warn", { selector: ["a"] }],
            "misc/rule2": ["warn", { selector: ["a", "b"] }]
          }
        ]
      };
    `,
    errors: [{ line: 4, messageId: MessageId.customMessage }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: [
          {
            "misc/rule": ["warn", { rules: [{ selector: ["a"] }] } ],
            "misc/rule": ["warn", { rules: [{ selector: ["a", "b"] }] }]
          }
        ]
      };
    `,
    errors: [{ line: 4, messageId: MessageId.customMessage }]
  }
]);
