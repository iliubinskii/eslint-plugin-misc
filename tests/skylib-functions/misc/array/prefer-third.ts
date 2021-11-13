import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/array/prefer-third"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-third", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "a.get(arr, 2);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
