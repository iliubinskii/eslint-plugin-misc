import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/types/prefer-NumStr"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-NumStr", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = number | string;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
