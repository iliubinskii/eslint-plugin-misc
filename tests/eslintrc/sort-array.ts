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
            "@skylib/rule": [
              "warn",
              {
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
            "@skylib/rule": [
              "warn",
              {
                selector: ["a", "b"]
              }
            ]
          }
        ]
      };
    `,
    errors: [{ line: 7, messageId: MessageId.incorrectSortingOrder }]
  }
]);
