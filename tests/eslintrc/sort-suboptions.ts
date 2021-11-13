import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["eslintrc/sort-suboptions"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-suboptions", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: {
          "@skylib/sort-keys": [
            "warn",
            {
              overrides: [{ _id: "b" }, { _id: "a" }]
            }
          ]
        }
      };
    `,
    output: `
      module.exports = {
        rules: {
          "@skylib/sort-keys": [
            "warn",
            {
              overrides: [{ _id: "a" }, { _id: "b" }]
            }
          ]
        }
      };
    `,
    errors: [{ line: 6, messageId: MessageId.incorrectSortingOrder }]
  }
]);
