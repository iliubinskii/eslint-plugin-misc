import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript-misc/functions/array/prefer-first"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-first", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "a.get(arr, 0);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
