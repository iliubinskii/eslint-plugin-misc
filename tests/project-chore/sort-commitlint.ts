import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["project-chore/sort-commitlint"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-commitlint", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "module.exports = [2, 1];",
    output: "module.exports = [1, 2];",
    errors: [{ line: 1, messageId: MessageId.incorrectSortingOrder }]
  }
]);
