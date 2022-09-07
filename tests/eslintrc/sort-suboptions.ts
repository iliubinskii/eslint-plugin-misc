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
          "misc/sort-keys": [
            "warn",
            {
              folders: [{ _id: "b" }, { _id: "a" }],
              overrides: [{ _id: "b" }, { _id: "a" }],
              rules: [{ _id: "b" }, { _id: "a" }],
              sources: [{ _id: "b" }, { _id: "a" }]
            }
          ]
        }
      };
    `,
    output: `
      module.exports = {
        rules: {
          "misc/sort-keys": [
            "warn",
            {
              folders: [{ _id: "a" }, { _id: "b" }],
              overrides: [{ _id: "a" }, { _id: "b" }],
              rules: [{ _id: "a" }, { _id: "b" }],
              sources: [{ _id: "a" }, { _id: "b" }]
            }
          ]
        }
      };
    `,
    errors: [
      { line: 6, messageId: MessageId.incorrectSortingOrder },
      { line: 7, messageId: MessageId.incorrectSortingOrder },
      { line: 8, messageId: MessageId.incorrectSortingOrder },
      { line: 9, messageId: MessageId.incorrectSortingOrder }
    ]
  }
]);
