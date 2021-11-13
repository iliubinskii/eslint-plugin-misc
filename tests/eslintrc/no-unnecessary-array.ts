import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["eslintrc/no-unnecessary-array"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unnecessary-array", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        overrides: [
          { files: ["./a"] },
          { files: ["./a", "./b"] }
        ]
      };
    `,
    errors: [{ line: 3, messageId: MessageId.customMessage }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: [
          {
            "@skylib/rule": [
              "warn",
              { selector: ["a"] },
              { selector: ["a", "b"] }
            ]
          }
        ]
      };
    `,
    errors: [{ line: 6, messageId: MessageId.customMessage }]
  }
]);
