import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/array/prefer-sort"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-sort", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "[].sort();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
